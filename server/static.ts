import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  const publicPath = path.resolve(__dirname, "..", "client", "public");

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
  } else if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  } else {
    // Fallback for current directory if nested
    const localPublicPath = path.resolve(__dirname, "public");
    if (fs.existsSync(localPublicPath)) {
      app.use(express.static(localPublicPath));
    }
  }

  app.get("/{*path}", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    
    const indexInDist = path.resolve(distPath, "index.html");
    const indexInPublic = path.resolve(publicPath, "index.html");
    const indexInLocal = path.resolve(__dirname, "public", "index.html");

    if (fs.existsSync(indexInDist)) {
      res.sendFile(indexInDist);
    } else if (fs.existsSync(indexInPublic)) {
      res.sendFile(indexInPublic);
    } else if (fs.existsSync(indexInLocal)) {
      res.sendFile(indexInLocal);
    } else {
      next();
    }
  });
}
