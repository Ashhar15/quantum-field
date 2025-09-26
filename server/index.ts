// quantum-field/server/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleRegister } from "./routes/register";
import { handleDashboard } from "./routes/dashboard";
import { handleTeacherDashboard } from "./routes/teacherDashboard";
import { handleAvatarUpload, uploadMiddleware } from "./routes/upload";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/register", handleRegister);
  app.get("/api/dashboard", handleDashboard);
  app.get("/api/teacher-dashboard", handleTeacherDashboard);
  app.post("/api/upload-avatar", uploadMiddleware, handleAvatarUpload);

  return app;
}