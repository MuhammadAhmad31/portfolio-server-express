import { Request, Response } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/profession";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const profession = await createModel(body);
    handleResponse(res, 201, {
      message: "Profession created successfully.",
      data: profession,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create profession.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const professions = await getAllModels();
    handleResponse(res, 200, {
      message: "Professions retrieved successfully.",
      data: professions,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve professions.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profession = await getModelById(id);
    if (profession) {
      handleResponse(res, 200, {
        message: "Profession retrieved successfully.",
        data: profession,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Profession not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve profession.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const profession = await updateModel(id, body);
    if (!profession) {
      return handleResponse(res, 404, {
        message: "Profession not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Profession updated successfully.",
      data: profession,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update profession.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profession = await deleteModel(id);
    if (!profession) {
      return handleResponse(res, 404, {
        message: "Profession not found.",
        code: 404,
      });
    }
    handleResponse(res, 200, {
      message: "Profession deleted successfully.",
      data: profession,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete profession.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
