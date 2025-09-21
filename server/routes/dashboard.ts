import { RequestHandler } from "express";
import { DashboardResponse } from "@shared/api";

export const handleDashboard: RequestHandler = (req, res) => {
  const dashboardData: DashboardResponse = {
    studentDetails: {
      name: "Team Faizul",
      studentId: "202404649",
      phoneNumber: "8235802386",
      email: "ashhar.fazal15@gmail.com",
      totalAttendance: "15 Days",
      lateAttendance: "6 Days",
      totalAbsent: "4 Days",
      avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    analytics: {
      classDays: {
        monthly: "19 Days",
        present: 15,
        late: 6,
        absent: 4,
      },
      topStudents: [
        { name: "Ashhar", attendance: "95%" },
        { name: "Fazan", attendance: "91%" },
        { name: "Zaheen", attendance: "89%" },
      ],
      attendanceRate: {
        year: "74%",
        months: ["January", "February", "March"],
      },
    },
  };

  res.status(200).json(dashboardData);
};