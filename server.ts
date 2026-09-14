import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const DATA_FILE = path.join(process.cwd(), "visitor_counts.json");
  
  // Initialize and load visitor data once on server startup
  let visitorData = { total: 0, uniqueIps: [] as string[] };
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

  // Active unique user tracker in-memory (map of IP to timestamp of last request)
  const activeUsers = new Map<string, number>();

  // Helper to get client IP
  const getClientIp = (req: express.Request): string => {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0].trim();
    }
    return req.socket.remoteAddress || "127.0.0.1";
  };

  // Log a visitor hit and fetch updated stats
  app.post("/api/visitors/hit", (req, res) => {
    try {
      const ip = getClientIp(req);
      const { isNewSession } = req.body;

      // Check if it's a new unique IP
      const isNewUnique = !visitorData.uniqueIps.includes(ip);
      if (isNewUnique) {
        visitorData.uniqueIps.push(ip);
      }

      // If it's a new session, increment total visitors
      if (isNewSession || isNewUnique) {
        visitorData.total += 1;
      }

      // Persist atomically
      saveVisitorDataAtomic();

      // Track active user activity
      const now = Date.now();
      activeUsers.set(ip, now);

      // Clean up users inactive for more than 3 minutes
      for (const [activeIp, lastSeen] of activeUsers.entries()) {
        if (now - lastSeen > 180000) { // 3 minutes
          activeUsers.delete(activeIp);
        }
      }

      res.json({
        total: visitorData.total,
        unique: visitorData.uniqueIps.length,
        active: Math.max(1, activeUsers.size) // ensure at least 1 (the current user) is active
      });
    } catch (error) {
      console.error("Error in visitor hit route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get active visitor stats in real-time
  app.get("/api/visitors/stats", (req, res) => {
    try {
      const ip = getClientIp(req);

      // Ensure current user is tracked as active
      const now = Date.now();
      activeUsers.set(ip, now);

      // Clean up users inactive for more than 3 minutes
      for (const [activeIp, lastSeen] of activeUsers.entries()) {
        if (now - lastSeen > 180000) {
          activeUsers.delete(activeIp);
        }
      }

      res.json({
        total: visitorData.total,
        unique: visitorData.uniqueIps.length,
        active: Math.max(1, activeUsers.size)
      });
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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
