import prisma from "../config/prisma";
import { Experience } from "../types/experience.type";

export const createModel = async (body: Experience) => {
  try {
    const experience = await prisma.experience.create({
      data: {
        position: body.position,
        company: body.company,
        description: body.description,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return experience;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const experiences = await prisma.experience.findMany();
    return experiences;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const experience = await prisma.experience.findUnique({
      where: {
        id: id,
      },
    });
    return experience;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Experience) => {
  try {
    const experience = await prisma.experience.update({
      where: {
        id: id,
      },
      data: {
        position: body.position,
        company: body.company,
        description: body.description,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return experience;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const experience = await prisma.experience.delete({
      where: {
        id: id,
      },
    });
    return experience;
  } catch (error) {
    throw error;
  }
};
