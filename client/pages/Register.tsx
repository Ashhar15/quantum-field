import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, RegisterResponse } from "@shared/api";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher">(
    "student",
  );
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please fill in all required fields");
      return;
    }
    if (selectedRole === "student" && !studentId) {
      alert("Student ID is required");
      return;
    }
    if (selectedRole === "teacher" && (!employeeId || !department)) {
      alert("Employee ID and Department are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const registrationData: RegisterRequest = {
      email,
      password,
      fullName,
      role: selectedRole,
      studentId: selectedRole === "student" ? studentId : undefined,
      employeeId: selectedRole === "teacher" ? employeeId : undefined,
      department: selectedRole === "teacher" ? department : undefined,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data: RegisterResponse = await response.json();

      if (data.success) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/64c8c5d53c814df6e850e0b018f52d30032dbe5e?width=880"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304"
          alt="AttendAce Logo"
          className="w-full h-full object-contain mix-blend-plus-darker"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-serif leading-tight text-black">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-inter">
              Join the University Attendance Portal
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/7d2ece736479f95ec22a5e750b1fa20030ad1a60?width=706"
              alt="University scene"
              className="w-full max-w-sm h-auto"
            />
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center">
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

          <form onSubmit={handleRegister} className="space-y-4 mt-6">
            <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
              <span className="mr-4">👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
              />
            </div>

            {selectedRole === "student" ? (
              <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
                <span className="mr-4">👨‍💻</span>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
                />
              </div>
            ) : (
              <>
                <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
                  <span className="mr-4">🧑‍🏫</span>
                  <input
                    type="text"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
                  />
                </div>
                <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
                  <span className="mr-4">🏛️</span>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base"
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Humanities">Humanities</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
              <span className="mr-4">📧</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
              />
            </div>

            <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
              <span className="mr-4">🔐</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
              />
            </div>

            <div className="flex items-center bg-attend-gray-light border-2 border-attend-gray-border rounded-full px-6 py-3">
              <span className="mr-4">✅</span>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-black font-inter text-base placeholder-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-attend-blue text-white font-inter text-sm px-6 py-3 rounded-full hover:bg-attend-blue-dark transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-sm font-inter">
            Already have an account?{" "}
            <a
              href="/"
              className="text-attend-blue hover:text-attend-blue-dark underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}