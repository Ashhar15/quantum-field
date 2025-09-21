// client/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Scan from "./pages/Scan";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import GenerateQR from "./pages/GenerateQR"; // Import the new page component
import { DistortionCursor } from "./components/ui/DistortionCursor";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DistortionCursor />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/generate-qr" element={<GenerateQR />} /> {/* Add this new route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);