import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  CheckCircle,
  BarChart2,
  QrCode as QrCodeIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { useState, useEffect } from "react";

export default function GenerateQR() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Select class");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  
  // In a real application, this list would come from an API
  const classes = ["Mathematics", "Physics", "Chemistry", "History", "Literature"];

  useEffect(() => {
    if (selectedClass !== "Select class") {
      // Generate a unique value for the QR code based on the selected class
      setQrValue(`https://example.com/attendance/${selectedClass.replace(/\s+/g, '-')}`);
    } else {
      setQrValue(""); // Clear QR code if no class is selected
    }
  }, [selectedClass]);

  const handleClassSelect = (className: string) => {
    setSelectedClass(className);
    setIsDropdownOpen(false);
  };

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
            href="/teacher-dashboard"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
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
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg bg-gray-200 w-full"
          >
            <QrCodeIcon className="w-6 h-6 text-gray-500" />
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
              <span className="text-2xl">🧑‍🏫</span>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
              Download Information
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative inline-block text-left mb-8">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-full border border-gray-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedClass}
                <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {classes.map((className) => (
                    <a
                      href="#"
                      key={className}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => handleClassSelect(className)}
                    >
                      {className}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {qrValue ? (
            <>
              <h2 className="text-3xl font-bold mb-6">Generated QR for {selectedClass}</h2>
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <QRCode
                  value={qrValue}
                  size={256}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-semibold text-gray-500">Please select a class to generate a QR code.</h2>
          )}
          
          <p className="text-center text-sm text-gray-500 mt-20 max-w-md mx-auto">
            Prof. Zeeshan's monthly attendance rate highlights his consistent
            commitment towards his passion.
          </p>
        </div>
      </main>
    </div>
  );
}