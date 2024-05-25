import prisma from "../config/prisma";
import { Profession } from "../types/profession.type";

export const createModel = async (body: Profession) => {
  try {
    const profession = await prisma.profesi.create({
      data: {
        name: body.name,
        description: body.description,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return profession;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const professions = await prisma.profesi.findMany();
    return professions;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const profession = await prisma.profesi.findUnique({
      where: {
        id: id,
      },
    });
    return profession;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Profession) => {
  try {
    const profession = await prisma.profesi.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        description: body.description,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return profession;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const profession = await prisma.profesi.delete({
      where: {
        id: id,
      },
    });
    return profession;
  } catch (error) {
    throw error;
  }
};
