import { Request, Response } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/skill";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const skill = await createModel(body);
    handleResponse(res, 201, {
      message: "Skill created successfully.",
      data: skill,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create skill.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const skills = await getAllModels();
    handleResponse(res, 200, {
      message: "Skills retrieved successfully.",
      data: skills,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve skills.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const skill = await getModelById(id);
    if (skill) {
      handleResponse(res, 200, {
        message: "Skill retrieved successfully.",
        data: skill,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Skill not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve skill.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const skill = await updateModel(id, body);
    if (skill) {
      handleResponse(res, 200, {
        message: "Skill updated successfully.",
        data: skill,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Skill not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update skill.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const skill = await deleteModel(id);
    if (skill) {
      handleResponse(res, 200, {
        message: "Skill deleted successfully.",
        data: skill,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Skill not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete skill.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
