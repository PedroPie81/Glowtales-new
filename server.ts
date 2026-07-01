import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import generateStoryHandler from "./api/generate-story";

dotenv.config();

async function startServer() {
  const app = express();
  // Port 3000 is the ONLY externally accessible port in AI Studio's environment.
  // The reverse proxy maps external traffic exclusively to port 3000.
  const PORT = 3000;

  app.use(express.json());

  // Logging middleware for diagnostic troubleshooting
  app.use((req, res, next) => {
    console.log(`[Diagnostic Log] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Delegate both GET (diagnostics) and POST (generation) to the shared Vercel-compatible handler
  app.get("/api/generate-story", generateStoryHandler);
  app.post("/api/generate-story", generateStoryHandler);

  // Serve static UI assets and wire up server
  const isCjs = typeof __filename !== "undefined";
  const isProduction = 
    process.env.NODE_ENV === "production" || 
    (isCjs && __filename.endsWith(".cjs")) || 
    !fs.existsSync(path.join(process.cwd(), "server.ts"));
  
  let viteDevServerMounted = false;

  if (!isProduction) {
    try {
      const { createServer } = await import("vite");
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite dev middleware mounted successfully.");
      viteDevServerMounted = true;
    } catch (viteError) {
      console.warn("Could not load Vite dev server middleware, falling back to static production serving:", viteError);
    }
  }

  // Fallback to static serving if we are in production or Vite dev server failed to mount
  if (isProduction || !viteDevServerMounted) {
    let distPath = path.join(process.cwd(), "dist");
    
    if (typeof __dirname !== "undefined") {
      if (fs.existsSync(path.join(__dirname, "index.html"))) {
        distPath = __dirname;
      } else if (fs.existsSync(path.join(__dirname, "dist", "index.html"))) {
        distPath = path.join(__dirname, "dist");
      }
    }
    
    console.log(`Serving static files from ${distPath}`);
    
    if (fs.existsSync(path.join(distPath, "index.html"))) {
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    } else {
      console.error(`CRITICAL ERROR: static files directory "${distPath}" or index.html does not exist.`);
      app.get("*", (req, res) => {
        res.status(500).send("Application static build files (dist/) not found. Please compile the application.");
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
