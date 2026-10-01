import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useReadAloud — lightweight Text-to-Speech (TTS) hook built on the browser's
 * native Web Speech API (`window.speechSynthesis`). No external dependencies,
 * works offline on devices that ship an installed voice (Android/Chrome,
 * iOS/Safari, desktop browsers), which fits this app's offline-first PWA
 * model for farmers in the field.
 *
 * Behaviour:
 *  - `toggle(text)` starts speaking `text` (lang picked from the current UI
 *    language: bn-BD preferred, falls back to any Bengali voice, then the
 *    system default) or stops mid-speech if already speaking.
 *  - `speaking` / `supported` drive the navbar icon state.
 *  - Speech is always cancelled on unmount and on tab change so audio never
 *    leaks across views.
 */
export interface UseReadAloudResult {
  /** True when the browser exposes window.speechSynthesis at all. */
  supported: boolean;
  /** True while an utterance is queued or actively being spoken. */
  speaking: boolean;
  /** Start reading `text` aloud, or stop if currently speaking. */
  toggle: (text: string) => void;
  /** Stop any active speech immediately. */
  stop: () => void;
}

const getVoiceForLang = (lang: 'bn' | 'en'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;
  if (lang === 'bn') {
    // Prefer an exact Bengali (Bangladesh) voice, then any Bengali voice.
    return (
      voices.find((v) => v.lang.toLowerCase() === 'bn-bd') ||
      voices.find((v) => v.lang.toLowerCase().startsWith('bn')) ||
      null
    );
  }
  return (
    voices.find((v) => v.lang.toLowerCase() === 'en-us') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
    null
  );
};

/** Strip navigation noise so only readable content words are spoken. */
const sanitizeForSpeech = (raw: string): string =>
  raw
    .replace(/\s+/g, ' ')
    .replace(/[|✓✕🧭]/g, ' ')
    .trim();

export function useReadAloud(language: 'bn' | 'en'): UseReadAloudResult {
  const supported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);
  // Keep a ref so callbacks can check/cancel without stale closures.
  const speakingRef = useRef(false);

  const stop = useCallback(() => {
    if (!supported) return;
    speakingRef.current = false;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  }, [supported]);

  const toggle = useCallback(
    (text: string) => {
      if (!supported) return;
      const synth = window.speechSynthesis;

      // Second tap while speaking = stop.
      if (speakingRef.current || synth.speaking || synth.pending) {
        stop();
        return;
      }

      const clean = sanitizeForSpeech(text);
      if (!clean) return;

      const u = new SpeechSynthesisUtterance(clean);
      u.lang = language === 'bn' ? 'bn-BD' : 'en-US';
      const voice = getVoiceForLang(language);
      if (voice) u.voice = voice;
      u.rate = language === 'bn' ? 0.95 : 1.0; // slightly slower for field use
      u.pitch = 1;

      u.onstart = () => {
        speakingRef.current = true;
        setSpeaking(true);
      };
      u.onend = () => {
        speakingRef.current = false;
        setSpeaking(false);
      };
      u.onerror = () => {
        speakingRef.current = false;
        setSpeaking(false);
      };

      // Voices load asynchronously on some browsers; kick the loader once so
      // getVoices() is populated by the next utterance if it was empty now.
      if (voice === null) {
        try {
          synth.getVoices();
        } catch {
          /* no-op: utterance still speaks with the default voice */
        }
      }

      synth.cancel(); // clear any lingering queue before starting fresh
      synth.speak(u);
    },
    [supported, language, stop]
  );

  // Chrome keeps speaking after leaving the page; always clean up.
  useEffect(() => {
    if (!supported) return;
    const handleBeforeUnload = () => window.speechSynthesis.cancel();
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  // Switching Bangla ⇄ English mid-speech would read with the wrong voice —
  // stop instead of silently continuing.
  useEffect(() => {
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return { supported, speaking, toggle, stop };
}
