import prisma from "../config/prisma";
import { Portfolio } from "../types/portfolio.type";

export const createModel = async (body: Portfolio) => {
  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        category: body.category,
        image: body.image,
        url: body.url,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const portfolios = await prisma.portfolio.findMany();
    return portfolios;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: id,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Portfolio) => {
  try {
    const portfolio = await prisma.portfolio.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        category: body.category,
        image: body.image,
        url: body.url,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const portfolio = await prisma.portfolio.delete({
      where: {
        id: id,
      },
    });
    return portfolio;
  } catch (error) {
    throw error;
  }
};
