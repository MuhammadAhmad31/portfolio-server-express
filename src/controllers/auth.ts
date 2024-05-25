import { Request, Response } from "express";
import { registerModel, loginModel } from "../models/auth";
import handleResponse from "../utils/handleResponse";

// Regular expression for validating email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.name || !body.email || !body.password) {
    return handleResponse(res, 400, {
      message: "Invalid input. Name, email, and password are required.",
      code: 400,
    });
  }

  if (!emailRegex.test(body.email)) {
    return handleResponse(res, 400, {
      message: "Invalid email format.",
      code: 400,
    });
  }

  try {
    const user = await registerModel(body);
    handleResponse(res, 201, {
      message: "User registration successful.",
      data: user,
      code: 201,
    });
  } catch (error) {
    handleResponse(res, 500, {
      message: "User registration failed.",
      error: error instanceof Error ? error.message : "Unknown error",
      code: 500,
    });
  }
};

let loginAttempts = new Map<string, { attempts: number; expiry: number }>();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loginAttempt = loginAttempts.get(email);
  const currentTime = Date.now();

  if (
    loginAttempt &&
    loginAttempt.attempts >= 3 &&
    loginAttempt.expiry > currentTime
  ) {
    return handleResponse(res, 429, {
      message: "Too many login attempts. Please try again later.",
      code: 429,
    });
  }

  try {
    const { token } = await loginModel(email, password);

    loginAttempts.delete(email);
    handleResponse(res, 200, {
      message: "Login successful.",
      data: { success: true, token },
      code: 200,
    });
  } catch (error) {
    if (loginAttempt) {
      loginAttempt.attempts += 1;
      loginAttempt.expiry = currentTime + 15 * 60 * 1000; // 15 minutes lockout
    } else {
      loginAttempts.set(email, {
        attempts: 1,
        expiry: currentTime + 15 * 60 * 1000,
      });
    }

    handleResponse(res, 400, {
      message: "Login failed.",
      error: error instanceof Error ? error.message : "Unknown error",
      code: 400,
    });
  }
};
