// quantum-field/client/pages/Dashboard.tsx
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  User,
  CheckCircle,
  BarChart2,
  QrCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardResponse } from "@shared/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data: DashboardResponse = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const { studentDetails, analytics } = dashboardData;

  return (
    <div className="flex bg-[#f5e8e8] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-6">
        <div className="flex justify-center p-2">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304"
            alt="AttendAce Logo"
            className="h-12 w-auto"
          />
        </div>
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200"
          >
            <LayoutDashboard className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <User className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Student</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <BarChart2 className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <CheckCircle className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Approve</span>
          </a>
          <button
            onClick={() => navigate("/scan")}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 w-full"
          >
            <QrCode className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Scan QR</span>
          </button>
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Settings</span>
          </a>
        </nav>
        <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <HelpCircle className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Help & Support</span>
          </a>
          <a
            href="#"
            onClick={() => navigate("/")}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Main Menu</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-gray-500" />
            <Bell className="w-6 h-6 text-gray-500" />
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src={studentDetails.avatarUrl}
                alt="User"
              />
              <ChevronDown className="w-4 h-4" />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
              Download Information
            </button>
          </div>
        </header>

        {/* Student Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Student Details</h3>
          <div className="flex items-center mb-4">
            <img
              className="w-16 h-16 rounded-full mr-4"
              src={studentDetails.avatarUrl}
              alt="Faizul"
            />
            <div>
              <p className="font-semibold">{studentDetails.name}</p>
              <p className="text-sm text-gray-500">
                Student ID: {studentDetails.studentId}
              </p>
              <p className="text-sm text-gray-500">
                Ph. number: {studentDetails.phoneNumber}
              </p>
              <p className="text-sm text-gray-500">
                Email: {studentDetails.email}
              </p>
            </div>
          </div>
          <div className="flex justify-around text-center">
            <div>
              <p className="font-semibold">{studentDetails.totalAttendance}</p>
              <p className="text-sm text-gray-500">Total Attendance</p>
            </div>
            <div>
              <p className="font-semibold">{studentDetails.lateAttendance}</p>
              <p className="text-sm text-gray-500">Late Attendance</p>
            </div>
            <div>
              <p className="font-semibold">{studentDetails.totalAbsent}</p>
              <p className="text-sm text-gray-500">Total Absent</p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">Class Days</p>
              <p className="text-sm text-gray-500">
                Class Days for Monthly: {analytics.classDays.monthly}
              </p>
              <div className="flex mt-4">
                <div className="w-1/3 text-center">
                  <div className="bg-green-500 text-white rounded-lg p-2">
                    {analytics.classDays.present}
                  </div>
                  <p className="text-sm mt-1">Present</p>
                </div>
                <div className="w-1/3 text-center">
                  <div className="bg-blue-500 text-white rounded-lg p-2">
                    {analytics.classDays.late}
                  </div>
                  <p className="text-sm mt-1">Late</p>
                </div>
                <div className="w-1/3 text-center">
                  <div className="bg-red-500 text-white rounded-lg p-2">
                    {analytics.classDays.absent}
                  </div>
                  <p className="text-sm mt-1">Absent</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold">Top Attendance Students</p>
              <ul className="space-y-2 mt-4">
                {analytics.topStudents.map((student, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {index + 1}. {student.name}
                    </span>{" "}
                    <span>{student.attendance}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold">Attendance Rate</p>
              <p className="text-sm text-gray-500">This Year</p>
              <div className="flex items-center mt-4">
                <div className="text-4xl font-bold">
                  {analytics.attendanceRate.year}
                </div>
                <div className="flex ml-auto space-x-2">
                  {analytics.attendanceRate.months.map((month, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        index === 0
                          ? "bg-green-200"
                          : index === 1
                          ? "bg-pink-200"
                          : "bg-blue-200"
                      }`}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}