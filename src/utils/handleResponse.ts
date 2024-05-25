import { Response } from "express";
import { ResponseData } from "../types/responseData.type";

const handleResponse = (
  res: Response,
  statusCode: number,
  responseData: ResponseData
) => {
  const { message, data = null, code, error = null } = responseData;

  res.status(statusCode).json({
    message,
    data,
    code: code || statusCode,
    error,
  });
};

export default handleResponse;
