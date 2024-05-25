import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import handleResponse from "../utils/handleResponse";

type UserData = {
  id: number;
  email: string;
};

interface ValidationRequest extends Request {
  headers: {
    authorization?: string;
  };
  userData?: UserData;
}

const verifyToken = (
  req: ValidationRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handleResponse(res, 401, {
      message: "Authorization token is required",
      code: 401,
    });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return handleResponse(res, 401, {
      message: "Invalid authorization format",
      code: 401,
    });
  }

  const secret = process.env.JWT_SECRET!;
  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== "string") {
      req.userData = jwtDecode as UserData;
    }

    next();
  } catch (error) {
    return handleResponse(res, 401, {
      message: "Unauthorized",
      error: error instanceof Error ? error.message : "Unknown error",
      code: 401,
    });
  }
};

export default verifyToken;
