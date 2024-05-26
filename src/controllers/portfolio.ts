import { Request, Response } from "express";
import {
  createModel,
  deleteModel,
  getAllModels,
  getModelById,
  updateModel,
} from "../models/portfolio";
import handleResponse from "../utils/handleResponse";

export const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const portfolio = await createModel(body);

    handleResponse(res, 201, {
      message: "Portfolio created successfully.",
      data: portfolio,
      code: 201,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to create portfolio.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const portfolios = await getAllModels();
    handleResponse(res, 200, {
      message: "Portfolios retrieved successfully.",
      data: portfolios,
      code: 200,
    });
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve portfolios.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const portfolio = await getModelById(id);
    if (portfolio) {
      handleResponse(res, 200, {
        message: "Portfolio retrieved successfully.",
        data: portfolio,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Portfolio not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to retrieve portfolio.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const portfolio = await updateModel(id, body);
    if (portfolio) {
      handleResponse(res, 200, {
        message: "Portfolio updated successfully.",
        data: portfolio,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Portfolio not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to update portfolio.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const portfolio = await deleteModel(id);
    if (portfolio) {
      handleResponse(res, 200, {
        message: "Portfolio deleted successfully.",
        data: portfolio,
        code: 200,
      });
    } else {
      handleResponse(res, 404, {
        message: "Portfolio not found.",
        code: 404,
      });
    }
  } catch (err) {
    handleResponse(res, 500, {
      message: "Failed to delete portfolio.",
      error: err instanceof Error ? err.message : "Unknown error",
      code: 500,
    });
  }
};
