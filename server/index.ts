// quantum-field/server/index.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleRegister } from "./routes/register";
import { handleDashboard } from "./routes/dashboard";
import { handleTeacherDashboard } from "./routes/teacherDashboard"; // Corrected filename

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Add this line to register the new route
  app.post("/api/register", handleRegister);

  // Add this line for the dashboard route
  app.get("/api/dashboard", handleDashboard);

  // Add this line for the new teacher dashboard route
  app.get("/api/teacher-dashboard", handleTeacherDashboard);

  return app;
}
