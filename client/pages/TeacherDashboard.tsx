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
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TeacherDashboardResponse } from "@shared/api";

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] =
    useState<TeacherDashboardResponse | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/teacher-dashboard");
        const data: TeacherDashboardResponse = await response.json();
        setDashboardData(data);
        if (data.teacherDetails.avatarUrl) {
          setAvatarPreview(data.teacherDetails.avatarUrl);
        }
      } catch (error) {
        console.error("Failed to fetch teacher dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('/api/upload-avatar', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          console.log('Avatar uploaded successfully:', result.avatarUrl);
        } else {
          console.error('Avatar upload failed:', result.message);
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const { teacherDetails } = dashboardData;

  return (
    <div className="flex h-screen bg-[#F5F5DC] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 p-4 space-y-6 bg-white shadow-md flex flex-col">
        <div className="flex justify-center p-2">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304"
            alt="AttendAce Logo"
            className="h-12 w-auto"
          />
        </div>
        <h2 className="text-center font-bold text-lg">Main Menu</h2>
        <nav className="space-y-2 flex-1">
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
            onClick={() => navigate("/generate-qr")}
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 w-full"
          >
            <QrCode className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Generate QR</span>
          </button>
        </nav>
        <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-6 h-6 text-gray-500" />
            <span className="ml-3">Settings</span>
          </a>
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
      <main className="flex-1 p-6 flex flex-col">
        <header className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Framework...."
              className="pl-10 pr-4 py-2 w-full border rounded-full bg-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-full">
              Monthly
            </button>
            <Bell className="w-6 h-6 text-gray-500" />
            <div className="flex items-center">
              <User className="w-8 h-8 rounded-full" />
              <ChevronDown className="w-4 h-4" />
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
              Download Information
            </button>
          </div>
        </header>

        {/* Teacher Details */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-6 text-center font-serif">
            Teacher Details
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 cursor-pointer" onClick={handleAvatarClick}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-gray-500" />
              )}
            </div>
            <div className="text-center text-lg space-y-2">
              <p className="font-semibold text-xl">{teacherDetails.name}</p>
              <p className="text-gray-600">
                Teacher ID: {teacherDetails.teacherId}
              </p>
              <p className="text-gray-600">
                Ph. number: {teacherDetails.phoneNumber}
              </p>
              <p className="text-gray-600">Email: {teacherDetails.email}</p>
              <p className="text-gray-600">
                Department: {teacherDetails.department}
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6 max-w-md mx-auto">
            Prof. Zeeshan's monthly attendance rate highlights his consistent
            commitment towards his passion.
          </p>
        </div>
      </main>
    </div>
  );
}