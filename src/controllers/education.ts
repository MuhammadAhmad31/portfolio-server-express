import { Request, Response } from "express";
import {
  createModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/education";
import handleResponse from "../utils/handleResponse";
import { deleteModel } from "../models/profession";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const education = await createModel(body);
    handleResponse(res, 201, {
      message: "Education created successfully.",
      data: education,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create education.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const educations = await getAllModels();
    handleResponse(res, 200, {
      message: "Educations retrieved successfully.",
      data: educations,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve educations.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const education = await getModelById(id);
    if (education) {
      handleResponse(res, 200, {
        message: "Education retrieved successfully.",
        data: education,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Education not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve education.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const education = await updateModel(id, body);
    if (!education) {
      return handleResponse(res, 404, {
        message: "Education not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Education updated successfully.",
      data: education,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update education.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const education = await deleteModel(id);
    if (!education) {
      return handleResponse(res, 404, {
        message: "Education not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Education removed successfully.",
      data: education,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to remove education.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
