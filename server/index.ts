import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleRegister } from "./routes/register";
import { handleDashboard } from "./routes/dashboard";
import { handleTeacherDashboard } from "./routes/teacherDashboard";
import { handleAvatarUpload, uploadMiddleware } from "./routes/upload";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});
app.get("/api/demo", handleDemo);
app.post("/api/register", handleRegister);
app.get("/api/dashboard", handleDashboard);
app.get("/api/teacher-dashboard", handleTeacherDashboard);
app.post("/api/upload-avatar", uploadMiddleware, handleAvatarUpload);

if (process.env.NODE_ENV === "production") {
  const spaPath = path.join(__dirname, "../spa");
  app.use(express.static(spaPath));
  // Use a regular expression to match all non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(spaPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
