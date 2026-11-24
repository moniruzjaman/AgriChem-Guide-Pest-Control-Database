#!/usr/bin/env python3
"""Regenerate the stats block of public/og-image.png (1200x630 social preview).

The artwork itself is static; this script keeps its NUMBERS in sync with the
published runtime database (public/downloads/pesticide_database.json):

  stat 1  ৮,০৩৫+   DAE নিবন্ধিত পণ্য / AGRICULTURAL PESTICIDES ONLY
  stat 2  ৮২%      MoA-তে ম্যাপ করা / IRAC . FRAC . HRAC
  stat 3  ৬        ফিল্ড টুল / OFFLINE PWA . BILINGUAL   (unchanged here)

It erases the two stale number lines (columns 1-2) and the column-1 label,
then redraws them with the site fonts (Hind Siliguri 700/600 — the woff2
subsets in public/fonts are decompressed to TTF in a temp dir at runtime).
Bengali glyph shaping uses libraqm (PIL must be built with it: it is, via
pillow built with raqm on this machine and on GH Actions runners).

Deps: pip install pillow fonttools brotli
Usage: python3 scripts/render-og-image.py
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "og-image.png"
DB = ROOT / "public" / "downloads" / "pesticide_database.json"
FONTS = ROOT / "public" / "fonts"

# --- current values (computed from the runtime DB, not hardcoded) -----------
data = json.loads(DB.read_text(encoding="utf-8"))
total = len(data)
agri = sum(1 for p in data if "public health" not in (p.get("type") or "").lower())
moa_pct = round(100 * sum(1 for p in data if p.get("moaCode")) / total)

BN_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def bn(n: int) -> str:
    return str(n).translate(BN_DIGITS)


STAT1 = f"{bn(agri)}+"        # was ৫,০৫২+ — an old-register count
STAT2 = f"{bn(moa_pct)}%"     # was ৯৬%
LABEL1 = "DAE নিবন্ধিত পণ্য"   # was "DAE নিবন্ধিত ফসল"
# ----------------------------------------------------------------------------

# erase zones (measured on the 1200x630 artwork; keep clear of neighbours)
NUM1_BOX = (48, 408, 282, 450)    # col-1 number line (digits ink 419-444)
NUM2_BOX = (298, 408, 530, 450)   # col-2 number line
LBL1_BOX = (48, 449, 290, 470)    # col-1 Bengali label row ONLY — the mono
                                  # sub-label "AGRICULTURAL PESTICIDES ONLY"
                                  # starts at y=478 and must survive
BASELINE = 440                    # shared digit baseline (col-3 "৬" sits here)
LBL_BASELINE = 464                # label row baseline (bottom of "DAE" caps)
INK_LEFT_1, INK_LEFT_2 = 57, 308  # old ink-left of both number lines


def woff2_to_ttf(src: Path, outdir: Path) -> Path:
    dst = outdir / (src.stem + ".ttf")
    subprocess.run(
        [sys.executable, "-c",
         "import sys; from fontTools.ttLib import TTFont;"
         "f=TTFont(sys.argv[1]); f.flavor=None; f.save(sys.argv[2])",
         str(src), str(dst)],
        check=True, capture_output=True)
    return dst


def load_font(weight: str, subset: str, size: int, outdir: Path):
    src = FONTS / f"HindSiliguri-{weight}-{subset}.woff2"
    return ImageFont.truetype(str(woff2_to_ttf(src, outdir)), size)


def fit_size(weight: str, subset: str, text: str, target_h: int, outdir: Path):
    """Largest font size whose rendered ink height for `text` is <= target_h."""
    lo, hi, best = 10, 90, 10
    while lo <= hi:
        mid = (lo + hi) // 2
        f = load_font(weight, subset, mid, outdir)
        bb = draw_ink_bbox(f, text)
        h = bb[3] - bb[1]
        if h <= target_h:
            best, lo = mid, mid + 1
        else:
            hi = mid - 1
    return best


def ink_bbox(img):
    """Ink bbox of dark pixels on white (Image.getbbox would treat white as ink)."""
    mask = img.convert("L").point(lambda v: 255 if v < 128 else 0)
    return mask.getbbox()


def draw_ink_bbox(font, text):
    """Ink bbox of `text` rendered with `font` on a scratch canvas."""
    scratch = Image.new("RGB", (900, 300), "white")
    d = ImageDraw.Draw(scratch)
    d.text((80, 80), text, font=font, fill="black")
    return ink_bbox(scratch)


def draw_runs_at_ink(draw, runs, ink_left, baseline, color):
    """Draw (text, font) runs left-to-right; align ink-left & baseline."""
    probe = Image.new("RGB", (1200, 300), "white")
    pd = ImageDraw.Draw(probe)
    x, widths = 100.0, []
    for text, font in runs:
        pd.text((x, 150), text, font=font, fill="black", anchor="ls")
        widths.append(font.getlength(text))
        x += widths[-1]
    bb = ink_bbox(probe)
    dx = ink_left - bb[0]
    for (text, font), w in zip(runs, widths):
        draw.text((100 + dx, baseline), text, font=font, fill=color, anchor="ls")
        dx += w


def sample_ink_color(img, box, thr=350):
    """Median color of the darkest pixels inside `box` (anti-aliasing-safe)."""
    import numpy as np
    a = np.array(img.crop(box)).reshape(-1, 3)
    dark = a[a.sum(axis=1) < thr]
    return tuple(np.median(dark, axis=0).astype(int)) if len(dark) else (0, 0, 0)


def main():
    with tempfile.TemporaryDirectory() as td:
        outdir = Path(td)
        im = Image.open(IMG).convert("RGB")
        draw = ImageDraw.Draw(im)
        white = im.getpixel((400, 395))          # card background sample
        green = sample_ink_color(im, (300, 408, 530, 450))   # from stale ৯৬%
        label_col = sample_ink_color(im, (48, 452, 290, 467), thr=300)
        if sum(green) >= 600:                    # stale number already gone
            green = (15, 115, 88)                # measured brand green fallback

        # number lines: Hind Siliguri 700, digits Bengali subset + ,/+/% latin.
        # Old digit ink height (৯৬) = 23px — fit the Bengali digit size to it.
        size_num = fit_size("700", "bengali", "৮০", 23, outdir)
        f_bn = load_font("700", "bengali", size_num, outdir)
        f_lat = load_font("700", "latin", size_num, outdir)
        runs1 = [("৮", f_bn), (",", f_lat), ("০৩৫", f_bn), ("+", f_lat)]
        runs2 = [("৮২", f_bn), ("%", f_lat)]

        draw.rectangle(NUM1_BOX, fill=white)
        draw.rectangle(NUM2_BOX, fill=white)
        draw.rectangle(LBL1_BOX, fill=white)

        draw_runs_at_ink(draw, runs1, INK_LEFT_1, BASELINE, green)
        draw_runs_at_ink(draw, runs2, INK_LEFT_2, BASELINE, green)

        # column-1 label: Bengali shaped via raqm, weight 600. Old label row
        # (DAE নিবন্ধিত ফসল): latin caps 11px tall on baseline 464.
        size_lbl = fit_size("600", "latin", "DA", 11, outdir)
        f_lbl_bn = load_font("600", "bengali", size_lbl, outdir)
        f_lbl_lat = load_font("600", "latin", size_lbl, outdir)
        lbl_runs = [("DAE ", f_lbl_lat), ("নিবন্ধিত পণ্য", f_lbl_bn)]
        draw_runs_at_ink(draw, lbl_runs, 57, LBL_BASELINE, label_col)

        im.save(IMG)
        print(f"og-image.png updated: stat1={STAT1} agri={agri}/{total} "
              f"stat2={STAT2} moa={moa_pct}% "
              f"[num {size_num}px, label {size_lbl}px, green={green}, "
              f"label_col={label_col}]")


if __name__ == "__main__":
    main()
