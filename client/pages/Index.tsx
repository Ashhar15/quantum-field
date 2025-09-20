import { useState } from "react";

export default function Index() {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">("student");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const idPlaceholder = selectedRole === "student" ? "Student ID" : "Employee ID";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted", { selectedRole, studentId, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background pattern with low opacity */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/64c8c5d53c814df6e850e0b018f52d30032dbe5e?width=880" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* AttendAce Logo */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304" 
          alt="AttendAce Logo" 
          className="w-full h-full object-contain mix-blend-plus-darker"
        />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="w-full max-w-md mx-auto space-y-6">
          
          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif leading-tight text-black">
              University<br />
              Attendance Portal
            </h1>
          </div>

          {/* University Illustration */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/7d2ece736479f95ec22a5e750b1fa20030ad1a60?width=706" 
              alt="University scene with students" 
              className="w-full max-w-sm h-auto"
            />
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center mb-8">
            <div className="relative bg-white border border-attend-gray-border rounded-full p-1 w-48">
              <div 
                className={`absolute top-1 left-1 w-24 h-6 bg-attend-blue rounded-full transition-transform duration-200 ${
                  selectedRole === "teacher" ? "translate-x-full" : ""
                }`}
              />
              <div className="relative flex">
                <button
                  onClick={() => setSelectedRole("student")}
                  className={`flex-1 py-1 px-4 text-xs font-jeju text-center rounded-full transition-colors ${
                    selectedRole === "student" ? "text-white" : "text-black"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setSelectedRole("teacher")}
                  className={`flex-1 py-1 px-4 text-xs font-jeju text-center rounded-full transition-colors ${
                    selectedRole === "teacher" ? "text-white" : "text-black"
                  }`}
                >
                  Teacher
                </button>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Student ID Input */}
            <div className="relative">
              <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-4">
                <span className="text-xl mr-4">👨‍💻</span>
                <input
                  type="text"
                  placeholder={idPlaceholder}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-black font-bold text-lg placeholder-black"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-4">
                <span className="text-xl mr-4">🔐</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-black font-inter text-lg placeholder-black"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 font-jeju">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3 h-3 border border-black opacity-50"
                />
                <span className="text-black">Remember me</span>
              </label>
              <div className="flex items-center gap-3">
                <a href="#" className="text-attend-green font-jeju underline">
                  Forgot Password?
                </a>
                <a href="/register" className="text-attend-blue font-jeju underline">
                  Register
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-attend-blue-dark border-4 border-attend-blue opacity-50 text-black font-inter text-sm px-6 py-3 rounded-full hover:opacity-75 transition-opacity"
              >
                Login ➜]
              </button>
            </div>
          </form>

          {/* Alternative Login */}
          <div className="text-center space-y-4">
            <div className="text-xs text-black font-jeju">or</div>
            
            {/* Fingerprint Icon */}
            <div className="flex justify-center">
              <div className="w-28 h-16 bg-attend-gray-bg flex items-center justify-center">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6295de2a825a38157f74aaea57f58ff7d10f4021?width=223" 
                  alt="Fingerprint" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Fingerprint Instructions */}
            <p className="text-black font-jeju text-sm leading-relaxed px-4">
              To login in your dashboard, touch the fingerprint icon<br />
              until your login is complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
