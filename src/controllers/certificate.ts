import { Request, Response } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/certificate";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const certificate = await createModel(body);
    handleResponse(res, 201, {
      message: "Certificate created successfully.",
      data: certificate,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create certificate.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const certificates = await getAllModels();
    handleResponse(res, 200, {
      message: "Certificates retrieved successfully.",
      data: certificates,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve certificates.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const certificate = await getModelById(id);
    if (certificate) {
      handleResponse(res, 200, {
        message: "Certificate retrieved successfully.",
        data: certificate,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Certificate not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve certificate.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const certificate = await updateModel(id, body);
    if (!certificate) {
      return handleResponse(res, 404, {
        message: "Certificate not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Certificate updated successfully.",
      data: certificate,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update certificate.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const certificate = await deleteModel(id);
    if (!certificate) {
      return handleResponse(res, 404, {
        message: "Certificate not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Certificate deleted successfully.",
      data: certificate,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete certificate.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
