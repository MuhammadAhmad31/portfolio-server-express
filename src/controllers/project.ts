import { Request, Response } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/project";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const project = await createModel(body);
    handleResponse(res, 201, {
      message: "Project created successfully.",
      data: project,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create project.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const projects = await getAllModels();
    handleResponse(res, 200, {
      message: "Projects retrieved successfully.",
      data: projects,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve projects.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await getModelById(id);
    if (project) {
      handleResponse(res, 200, {
        message: "Project retrieved successfully.",
        data: project,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Project not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve project.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const project = await updateModel(id, body);
    handleResponse(res, 200, {
      message: "Project updated successfully.",
      data: project,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update project.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await deleteModel(id);
    handleResponse(res, 200, {
      message: "Project deleted successfully.",
      data: project,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete project.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
