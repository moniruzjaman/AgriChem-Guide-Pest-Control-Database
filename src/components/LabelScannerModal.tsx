import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ImagePlus, ScanLine, Type, X } from 'lucide-react';
import { ChemicalProduct } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import {
  enqueueOfflineScan,
  matchParsedLabel,
  parseLabelScan,
  type ScanMatch,
} from '../utils/scanUtils';
import { MoAGroupBadge } from './MoAGroupBadge';
import './LabelScannerModal.css';
import './MoAGroupBadge.css';

export type ScanMode = 'qr' | 'ocr';

interface LabelScannerModalProps {
  open: boolean;
  products: ChemicalProduct[];
  initialMode?: ScanMode;
  onClose: () => void;
  onSelectProduct: (product: ChemicalProduct, raw: string) => void;
}

type WorkerLike = {
  setParameters: (opts: Record<string, string>) => Promise<void>;
  recognize: (image: HTMLCanvasElement | HTMLImageElement | File) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
};

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function cropVideoFrame(video: HTMLVideoElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;
  const sx = Math.floor(w * 0.14);
  const sy = Math.floor(h * 0.18);
  const sw = Math.floor(w * 0.72);
  const sh = Math.floor(h * 0.64);
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
  return canvas;
}

function sourceSize(source: CanvasImageSource): { width: number; height: number } {
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth || 640, height: source.videoHeight || 480 };
  }
  if (source instanceof HTMLImageElement) {
    return { width: source.naturalWidth || source.width || 640, height: source.naturalHeight || source.height || 480 };
  }
  if (source instanceof HTMLCanvasElement) {
    return { width: source.width || 640, height: source.height || 480 };
  }
  return { width: 640, height: 480 };
}

export const LabelScannerModal: React.FC<LabelScannerModalProps> = ({
  open,
  products,
  initialMode = 'qr',
  onClose,
  onSelectProduct,
}) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const sheetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workerRef = useRef<WorkerLike | null>(null);
  const qrTimerRef = useRef<number | null>(null);
  const ocrBusyRef = useRef(false);

  const [mode, setMode] = useState<ScanMode>(initialMode);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [rawText, setRawText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [matches, setMatches] = useState<ScanMatch[]>([]);
  const [cameraOn, setCameraOn] = useState(false);

  useFocusTrap(sheetRef, open);

  const copy = {
    kicker: bn ? 'ফিল্ড স্ক্যান · গাইড §4.3' : 'FIELD SCAN · GUIDE §4.3',
    title: bn ? 'লেবেল স্ক্যান ও বাংলা OCR' : 'Label scan & Bangla OCR',
    lede: bn
      ? 'ক্যামেরা দিয়ে QR/বারকোড পড়ুন, অথবা বাংলা-ইংরেজি লেবেলের ছবি থেকে নিবন্ধন নম্বর, ব্র্যান্ড ও MoA গ্রুপ বের করুন।'
      : 'Read a QR/barcode with the camera, or extract registration no, brand and MoA group from a Bangla/English label photo.',
    qr: bn ? 'QR / বারকোড' : 'QR / barcode',
    qrHint: bn ? 'লেবেলের QR কোড টার্গেটে রাখুন' : 'Hold the label QR in the frame',
    ocr: bn ? 'বাংলা OCR' : 'Bangla OCR',
    ocrHint: bn ? 'বাংলা বা মিশ্র লেবেলের ছবি পড়ুন' : 'Read Bangla or mixed-script labels',
    startCam: bn ? 'ক্যামেরা চালু' : 'Start camera',
    stopCam: bn ? 'ক্যামেরা বন্ধ' : 'Stop camera',
    snap: bn ? 'ছবি তুলে পড়ুন' : 'Capture & read',
    upload: bn ? 'গ্যালারি থেকে ছবি' : 'Upload photo',
    looking: bn ? 'QR খোঁজা হচ্ছে…' : 'Looking for a QR code…',
    reading: bn ? 'বাংলা লেবেল পড়া হচ্ছে…' : 'Reading Bangla label…',
    noCam: bn ? 'ক্যামেরা পাওয়া যায়নি। ছবি আপলোড করুন।' : 'Camera unavailable. Upload a photo instead.',
    noMatch: bn ? 'ক্যাটালগে মিল পাওয়া যায়নি — টেক্সট নিচে দেখুন।' : 'No catalogue match — inspect the text below.',
    found: bn ? 'মিল পাওয়া গেছে — পণ্য বেছে নিন' : 'Matches found — pick a product',
    raw: bn ? 'পড়া টেক্সট' : 'Read text',
    close: bn ? 'বন্ধ' : 'Close',
  };

  const applyRaw = useCallback((raw: string, scanMode: ScanMode) => {
    const parsed = parseLabelScan(raw);
    const hits = matchParsedLabel(parsed, products).slice(0, 8);
    setRawText(raw);
    setMatches(hits);
    enqueueOfflineScan({
      mode: scanMode,
      raw,
      registrationNos: parsed.registrationNos,
    });
    if (!hits.length) {
      setStatus(bn ? 'ক্যাটালগে মিল পাওয়া যায়নি — টেক্সট নিচে দেখুন।' : 'No catalogue match — inspect the text below.');
    } else {
      const found = bn ? 'মিল পাওয়া গেছে — পণ্য বেছে নিন' : 'Matches found — pick a product';
      setStatus(`${found} · ${hits[0].product.tradeName}`);
    }
  }, [bn, products]);

  const stopCamera = useCallback(() => {
    if (qrTimerRef.current) {
      window.clearInterval(qrTimerRef.current);
      qrTimerRef.current = null;
    }
    stopStream(streamRef.current);
    streamRef.current = null;
    setCameraOn(false);
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const startCamera = useCallback(async () => {
    setError('');
    stopCamera();
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(copy.noCam);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
      setStatus(mode === 'qr'
        ? (bn ? 'QR খোঁজা হচ্ছে…' : 'Looking for a QR code…')
        : (bn ? 'বাংলা বা মিশ্র লেবেলের ছবি পড়ুন' : 'Read Bangla or mixed-script labels'));
    } catch {
      setError(copy.noCam);
    }
  }, [bn, copy.noCam, mode, stopCamera]);

  const loadQrDetector = useCallback(async () => {
    const w = window as Window & { BarcodeDetector?: new (opts: { formats: string[] }) => {
      detect: (source: CanvasImageSource) => Promise<Array<{ rawValue: string }>>;
    } };
    if (typeof w.BarcodeDetector === 'function') {
      return new w.BarcodeDetector({ formats: ['qr_code', 'code_128', 'data_matrix'] });
    }
    const mod = await import('jsqr');
    const jsQR = (mod.default || mod) as (data: Uint8ClampedArray, w: number, h: number) => { data: string } | null;
    return {
      detect: async (source: CanvasImageSource) => {
        const canvas = document.createElement('canvas');
        const { width, height } = sourceSize(source);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx || !width || !height) return [];
        ctx.drawImage(source as CanvasImageSource, 0, 0, width, height);
        const image = ctx.getImageData(0, 0, width, height);
        const result = jsQR(image.data, width, height);
        return result?.data ? [{ rawValue: result.data }] : [];
      },
    };
  }, []);

  const runQrLoop = useCallback(async () => {
    if (!cameraOn || mode !== 'qr' || !videoRef.current) return;
    try {
      const detector = await loadQrDetector();
      qrTimerRef.current = window.setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return;
        try {
          const codes = await detector.detect(videoRef.current);
          const value = codes[0]?.rawValue?.trim();
          if (value) {
            applyRaw(value, 'qr');
            stopCamera();
          }
        } catch {
          /* keep scanning */
        }
      }, 450);
    } catch {
      setError(bn ? 'QR রিডার লোড হয়নি। ছবি আপলোড করে চেষ্টা করুন।' : 'QR reader failed to load. Try uploading a photo.');
    }
  }, [applyRaw, bn, cameraOn, loadQrDetector, mode, stopCamera]);

  const ensureOcrWorker = useCallback(async () => {
    if (workerRef.current) return workerRef.current;
    setStatus(bn ? 'বাংলা OCR ইঞ্জিন লোড হচ্ছে…' : 'Loading Bangla OCR engine…');
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('ben+eng') as unknown as WorkerLike;
    await worker.setParameters({
      preserve_interword_spaces: '1',
    });
    workerRef.current = worker;
    return worker;
  }, [bn]);

  const runOcr = useCallback(async (source: HTMLCanvasElement | HTMLImageElement | File) => {
    if (ocrBusyRef.current) return;
    ocrBusyRef.current = true;
    setError('');
    setStatus(copy.reading);
    try {
      const worker = await ensureOcrWorker();
      const result = await worker.recognize(source);
      const text = (result.data.text || '').replace(/\s+\n/g, '\n').trim();
      if (!text) {
        setStatus(bn ? 'লেবেল থেকে টেক্সট পড়া যায়নি। আলো বাড়িয়ে আবার চেষ্টা করুন।' : 'No text could be read. Add light and try again.');
      } else {
        applyRaw(text, 'ocr');
      }
    } catch {
      setError(bn ? 'OCR চালু হয়নি। নেট সংযোগ দিয়ে আবার চেষ্টা করুন।' : 'OCR failed to start. Retry with a network connection.');
    } finally {
      ocrBusyRef.current = false;
    }
  }, [applyRaw, bn, copy.reading, ensureOcrWorker]);

  const captureOcr = useCallback(async () => {
    if (!videoRef.current) return;
    const frame = cropVideoFrame(videoRef.current);
    setPreviewUrl(frame.toDataURL('image/jpeg', 0.85));
    await runOcr(frame);
  }, [runOcr]);

  const onFile = useCallback(async (file: File) => {
    setError('');
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    if (mode === 'ocr') {
      await runOcr(file);
      return;
    }
    const img = new Image();
    img.onload = async () => {
      try {
        const detector = await loadQrDetector();
        const codes = await detector.detect(img);
        const value = codes[0]?.rawValue?.trim();
        if (value) applyRaw(value, 'qr');
        else await runOcr(file);
      } catch {
        await runOcr(file);
      }
    };
    img.src = url;
  }, [applyRaw, loadQrDetector, mode, runOcr]);

  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setRawText('');
    setMatches([]);
    setError('');
    setStatus(initialMode === 'qr' ? copy.qrHint : copy.ocrHint);
    setPreviewUrl('');
    startCamera();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialMode]);

  useEffect(() => {
    if (open && cameraOn && mode === 'qr') {
      runQrLoop();
    }
    return () => {
      if (qrTimerRef.current) {
        window.clearInterval(qrTimerRef.current);
        qrTimerRef.current = null;
      }
    };
  }, [cameraOn, mode, open, runQrLoop]);

  useEffect(() => () => {
    stopCamera();
    workerRef.current?.terminate();
    workerRef.current = null;
  }, [stopCamera]);

  if (!open) return null;

  return (
    <div className="acg-scan" role="dialog" aria-modal="true" aria-labelledby="scan-title">
      <div className="acg-scan-sheet" ref={sheetRef}>
        <header className="acg-scan-head">
          <div>
            <div className="acg-scan-kicker">{copy.kicker}</div>
            <h2 id="scan-title">{copy.title}</h2>
            <p>{copy.lede}</p>
          </div>
          <button type="button" className="acg-scan-close" onClick={onClose} aria-label={copy.close}>
            <X size={16} />
          </button>
        </header>

        <div className="acg-scan-modes">
          <button
            type="button"
            className={`acg-scan-mode ${mode === 'qr' ? 'is-active' : ''}`}
            onClick={() => { setMode('qr'); setStatus(copy.qrHint); }}
          >
            <ScanLine size={16} /> {copy.qr}
            <span>{copy.qrHint}</span>
          </button>
          <button
            type="button"
            className={`acg-scan-mode ${mode === 'ocr' ? 'is-active' : ''}`}
            onClick={() => { setMode('ocr'); setStatus(copy.ocrHint); }}
          >
            <Type size={16} /> {copy.ocr}
            <span>{copy.ocrHint}</span>
          </button>
        </div>

        <div className="acg-scan-stage">
          {previewUrl && !cameraOn ? (
            <img src={previewUrl} alt="" />
          ) : (
            <video ref={videoRef} playsInline muted autoPlay />
          )}
          <div className="acg-scan-frame" />
          {status && <div className="acg-scan-status">{status}</div>}
        </div>

        <div className="acg-scan-actions">
          <button type="button" className="is-primary" onClick={cameraOn ? stopCamera : startCamera}>
            <Camera size={14} /> {cameraOn ? copy.stopCam : copy.startCam}
          </button>
          {mode === 'ocr' && cameraOn && (
            <button type="button" onClick={captureOcr}>
              {copy.snap}
            </button>
          )}
          <label>
            <ImagePlus size={14} /> {copy.upload}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFile(file);
                e.target.value = '';
              }}
            />
          </label>
        </div>

        {error && <div className="acg-scan-error">{error}</div>}

        {rawText && (
          <div className="acg-scan-raw">
            <p>{copy.raw}</p>
            <pre>{rawText}</pre>
          </div>
        )}

        {matches.length > 0 && (
          <div className="acg-scan-matches">
            <p>{copy.found}</p>
            {matches.map((hit) => (
              <button
                type="button"
                key={hit.product.id}
                className="acg-scan-hit"
                onClick={() => onSelectProduct(hit.product, rawText)}
              >
                <strong>{hit.product.tradeName}</strong>
                <span>
                  {hit.product.registrationNo} · {hit.product.commonName} · {hit.field}/{hit.confidence}
                </span>
                {hit.product.moaCode && (
                  <MoAGroupBadge moaCode={hit.product.moaCode} type={hit.product.type} size="sm" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
