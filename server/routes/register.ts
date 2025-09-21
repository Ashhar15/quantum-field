import { RequestHandler } from "express";
import { RegisterRequest, RegisterResponse } from "@shared/api";

export const handleRegister: RequestHandler = (req, res) => {
  const { email, password, fullName, role } = req.body as RegisterRequest;

  if (!email || !password || !fullName || !role) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // In a real application, you would save the user to a database here.
  // For this example, we'll just simulate a successful registration.
  console.log("New user registered:", { email, fullName, role });

  const response: RegisterResponse = {
    success: true,
    message: "User registered successfully",
  };
  res.status(200).json(response);
};