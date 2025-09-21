/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
  fullName: string;
  role: "student" | "teacher";
  studentId?: string;
  employeeId?: string;
  department?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface DashboardResponse {
  studentDetails: {
    name: string;
    studentId: string;
    phoneNumber: string;
    email: string;
    totalAttendance: string;
    lateAttendance: string;
    totalAbsent: string;
    avatarUrl: string;
  };
  analytics: {
    classDays: {
      monthly: string;
      present: number;
      late: number;
      absent: number;
    };
    topStudents: {
      name: string;
      attendance: string;
    }[];
    attendanceRate: {
      year: string;
      months: string[];
    };
  };
}

export interface TeacherDashboardResponse {
  teacherDetails: {
    name: string;
    teacherId: string;
    phoneNumber: string;
    email: string;
    department: string;
    avatarUrl: string;
  };
}