import { Request, Response } from "express";

import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/experience";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const experience = await createModel(body);
    handleResponse(res, 201, {
      message: "Experience created successfully.",
      data: experience,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create experience.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const experiences = await getAllModels();
    handleResponse(res, 200, {
      message: "Experiences retrieved successfully.",
      data: experiences,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve experiences.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const experience = await getModelById(id);
    if (experience) {
      handleResponse(res, 200, {
        message: "Experience retrieved successfully.",
        data: experience,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Experience not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve experience.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const experience = await updateModel(id, body);
    if (experience) {
      handleResponse(res, 200, {
        message: "Experience updated successfully.",
        data: experience,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Experience not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update experience.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const experience = await deleteModel(id);
    if (experience) {
      handleResponse(res, 200, {
        message: "Experience deleted successfully.",
        data: experience,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Experience not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete experience.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
