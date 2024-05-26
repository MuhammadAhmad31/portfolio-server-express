import { Education } from "@prisma/client";
import prisma from "../config/prisma";

export const createModel = async (body: Education) => {
  try {
    const education = await prisma.education.create({
      data: {
        name: body.name,
        period: body.period,
        major: body.major,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return education;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const educations = await prisma.education.findMany();
    return educations;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const education = await prisma.education.findUnique({
      where: {
        id: id,
      },
    });
    return education;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Education) => {
  try {
    const education = await prisma.education.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        period: body.period,
        major: body.major,
        start_date: body.start_date,
        end_date: body.end_date,
      },
    });
    return education;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const education = await prisma.education.delete({
      where: {
        id: id,
      },
    });
    return education;
  } catch (error) {
    throw error;
  }
};
