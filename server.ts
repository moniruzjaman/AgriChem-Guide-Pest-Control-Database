import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const DATA_FILE = path.join(process.cwd(), "visitor_counts.json");
  
  interface DownloadRecord {
    kind: string;
    label: string;
    ts: number;
    /** True when the download was performed by a visitor who arrived through
     *  a shared link (?from=share / ?ref=share / #sh- hash). This is how we
     *  tell whether a person we shared with actually opened the app and
     *  downloaded something. */
    viaShare: boolean;
  }

  // Keep only the most recent download records so the JSON file stays small.
  const MAX_DOWNLOAD_RECORDS = 1000;
  // Cap the unique-visitor list so the JSON file cannot grow unbounded.
  // Old hashes are evicted FIFO once the cap is exceeded.
  const MAX_UNIQUE_VISITORS = 50000;

  // Initialize and load visitor data once on server startup.
  // NOTE: `uniqueIps` historically held raw IP addresses. For privacy it now
  // holds SHA-256 hashes (first 16 hex chars) so no PII is ever persisted.
  let visitorData = {
    total: 0,
    uniqueIps: [] as string[],
    downloads: [] as DownloadRecord[],
  };
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, "utf8");
      if (fileContent.trim()) {
        visitorData = JSON.parse(fileContent);
      }
    }
  } catch (e) {
    console.error("Failed to load initial visitor data on startup:", e);
  }
  // Safeguard array and number structures
  if (typeof visitorData.total !== "number") visitorData.total = 0;
  if (!Array.isArray(visitorData.uniqueIps)) visitorData.uniqueIps = [];
  if (!Array.isArray(visitorData.downloads)) visitorData.downloads = [];

  // Atomic file save helper to prevent concurrent file truncations or corruptions
  const saveVisitorDataAtomic = () => {
    try {
      const tempPath = DATA_FILE + ".tmp";
      fs.writeFileSync(tempPath, JSON.stringify(visitorData, null, 2), "utf8");
      fs.renameSync(tempPath, DATA_FILE);
    } catch (e) {
      console.error("Failed to save visitor data atomically:", e);
    }
  };

  // Active unique user tracker in-memory (map of visitor-hash to timestamp
  // of last request). Keys are SHA-256 hashes, never raw IPs.
  const activeUsers = new Map<string, number>();

  // Helper to get client IP, then hash it for privacy. We never persist or
  // log raw IP addresses — only the first 16 hex chars of the SHA-256 hash,
  // which is sufficient for unique-visitor counting while being irreversible.
  const getVisitorHash = (req: express.Request): string => {
    let rawIp = "127.0.0.1";
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      rawIp = forwarded.split(",")[0].trim();
    } else if (req.socket.remoteAddress) {
      rawIp = req.socket.remoteAddress;
    }
    // Strip IPv6 prefix from IPv4-mapped addresses for consistency.
    rawIp = rawIp.replace(/^::ffff:/, "");
    return crypto.createHash("sha256").update(rawIp).digest("hex").slice(0, 16);
  };

  // Shared stats payload for all API responses. `downloads` is the total
  // number of PDF/guide downloads recorded server-side; `shareDownloads`
  // counts only those made by visitors who arrived via a shared link —
  // i.e. evidence that the person you shared with actually opened the app.
  const buildStatsPayload = () => ({
    total: visitorData.total,
    unique: visitorData.uniqueIps.length,
    active: Math.max(1, activeUsers.size),
    downloads: visitorData.downloads.length,
    shareDownloads: visitorData.downloads.filter((d) => d.viaShare).length,
  });

  // Log a content download (PDF guide, prescription, rotation schedule…).
  // The client sends `viaShare` when the visitor arrived through a shared
  // link (?from=share / ?ref=share / #sh- hash), so we can attribute
  // downloads back to shares.
  app.post("/api/downloads/log", (req, res) => {
    try {
      const { kind, label, viaShare } = req.body || {};
      visitorData.downloads.push({
        kind: String(kind || "unknown").slice(0, 40),
        label: String(label || "").slice(0, 120),
        ts: Date.now(),
        viaShare: Boolean(viaShare),
      });
      // Trim oldest records beyond the cap.
      if (visitorData.downloads.length > MAX_DOWNLOAD_RECORDS) {
        visitorData.downloads = visitorData.downloads.slice(-MAX_DOWNLOAD_RECORDS);
      }
      saveVisitorDataAtomic();
      res.json(buildStatsPayload());
    } catch (error) {
      console.error("Error in download log route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Lightweight beacon endpoint used by navigator.sendBeacon on unload, so
  // downloads triggered right before closing the tab still get counted.
  app.post("/api/downloads/beacon", express.text({ type: "*/*" }), (req, res) => {
    try {
      let body: any = {};
      if (typeof req.body === "string" && req.body.trim()) {
        try {
          body = JSON.parse(req.body);
        } catch {
          const params = new URLSearchParams(req.body);
          body = {
            kind: params.get("kind"),
            label: params.get("label"),
            viaShare: params.get("viaShare") === "true",
          };
        }
      } else if (req.query && Object.keys(req.query).length) {
        body = {
          kind: req.query.kind,
          label: req.query.label,
          viaShare: req.query.viaShare === "true",
        };
      }
      if (body && body.kind) {
        visitorData.downloads.push({
          kind: String(body.kind).slice(0, 40),
          label: String(body.label || "").slice(0, 120),
          ts: Date.now(),
          viaShare: Boolean(body.viaShare),
        });
        if (visitorData.downloads.length > MAX_DOWNLOAD_RECORDS) {
          visitorData.downloads = visitorData.downloads.slice(-MAX_DOWNLOAD_RECORDS);
        }
        saveVisitorDataAtomic();
      }
      res.status(204).end();
    } catch (error) {
      console.error("Error in download beacon route:", error);
      res.status(500).end();
    }
  });

  // Log a visitor hit and fetch updated stats
  app.post("/api/visitors/hit", (req, res) => {
    try {
      const visitorHash = getVisitorHash(req);
      const { isNewSession } = req.body;

      // Check if it's a new unique visitor (hash)
      const isNewUnique = !visitorData.uniqueIps.includes(visitorHash);
      if (isNewUnique) {
        visitorData.uniqueIps.push(visitorHash);
        // Evict oldest hashes once we exceed the cap (FIFO).
        if (visitorData.uniqueIps.length > MAX_UNIQUE_VISITORS) {
          visitorData.uniqueIps = visitorData.uniqueIps.slice(-MAX_UNIQUE_VISITORS);
        }
      }

      // If it's a new session, increment total visitors
      if (isNewSession || isNewUnique) {
        visitorData.total += 1;
      }

      // Persist atomically
      saveVisitorDataAtomic();

      // Track active user activity
      const now = Date.now();
      activeUsers.set(visitorHash, now);

      // Clean up users inactive for more than 3 minutes
      for (const [activeHash, lastSeen] of activeUsers.entries()) {
        if (now - lastSeen > 180000) { // 3 minutes
          activeUsers.delete(activeHash);
        }
      }

      res.json(buildStatsPayload());
    } catch (error) {
      console.error("Error in visitor hit route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get active visitor stats in real-time
  app.get("/api/visitors/stats", (req, res) => {
    try {
      const visitorHash = getVisitorHash(req);

      // Ensure current user is tracked as active
      const now = Date.now();
      activeUsers.set(visitorHash, now);

      // Clean up users inactive for more than 3 minutes
      for (const [activeHash, lastSeen] of activeUsers.entries()) {
        if (now - lastSeen > 180000) {
          activeUsers.delete(activeHash);
        }
      }

      res.json(buildStatsPayload());
    } catch (error) {
      console.error("Error in visitor stats route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // IMPORTANT: `index: false` disables express.static's auto-serving of
    // index.html for "/" and "/index.html". Without this, the catch-all
    // below never runs and OG_IMAGE_ORIGIN placeholders would never be
    // rewritten — social crawlers would see URLs pointing at the wrong
    // domain. All other static assets (JS, CSS, PNG, SVG, fonts, manifest)
    // are still served directly by express.static.
    app.use(express.static(distPath, { index: false }));

    // Cached index.html with OG_IMAGE_ORIGIN placeholders rewritten to the
    // real request origin. Social crawlers (WhatsApp, Facebook, Telegram,
    // Twitter-X, LinkedIn) do NOT execute JavaScript, so they only ever see
    // the raw HTML the server returns. If that HTML points at the wrong
    // domain (or worse, a relative path), the crawler either fetches a 404
    // for the OG image or drops the preview entirely. This middleware makes
    // the same built bundle work on pesticide.krishiai.live (the canonical
    // production domain), agrichem-guide.vercel.app (Vercel preview fallback),
    // localhost, and any custom domain — crawlers always see fully-qualified
    // absolute URLs that match the host they actually fetched the page from.
    const PROD_PLACEHOLDER = "https://pesticide.krishiai.live";
    let cachedIndexHtml: string | null = null;
    const getIndexHtml = (): string => {
      if (cachedIndexHtml === null) {
        cachedIndexHtml = fs.readFileSync(
          path.join(distPath, "index.html"),
          "utf8"
        );
      }
      return cachedIndexHtml;
    };

    const rewriteOrigin = (html: string, req: express.Request): string => {
      // Trust the proxy headers (X-Forwarded-*) if present, since the app is
      // typically deployed behind Vercel/Cloudflare/Nginx. Otherwise fall back
      // to req.protocol which correctly reports "http" for direct localhost
      // connections and "https" for direct TLS connections.
      const proto =
        (req.headers["x-forwarded-proto"] as string)?.split(",")[0]?.trim() ||
        req.protocol ||
        "https";
      const host =
        (req.headers["x-forwarded-host"] as string) || req.headers.host || "";
      if (!host) return html;
      const origin = `${proto}://${host}`;
      // Replace all occurrences of the placeholder origin with the real one.
      // This covers og:image, og:image:secure_url, og:url, twitter:image,
      // and the <link rel="canonical"> tag in a single pass.
      return html.split(PROD_PLACEHOLDER).join(origin);
    };

    // Catch-all: serve the rewritten index.html for any non-asset URL.
    // Required for SPA hash-routing AND for per-request origin rewriting.
    app.get("*", (req, res) => {
      res.type("html").send(rewriteOrigin(getIndexHtml(), req));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
