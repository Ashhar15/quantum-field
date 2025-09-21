import { RequestHandler } from "express";
import { TeacherDashboardResponse } from "@shared/api";

export const handleTeacherDashboard: RequestHandler = (req, res) => {
  const dashboardData: TeacherDashboardResponse = {
    teacherDetails: {
      name: "Prof. Zeeshan",
      teacherId: "202404649",
      phoneNumber: "8235802386",
      email: "faizkhanqat@gmail.com",
      department: "Deptartment of Civil Engg.",
      avatarUrl: "",
    },
  };

  res.status(200).json(dashboardData);
};