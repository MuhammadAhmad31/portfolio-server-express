import prisma from "../config/prisma";
import { Skill } from "../types/skill.type";

export const createModel = async (body: Skill) => {
  try {
    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        range: body.range,
      },
    });
    return skill;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const skills = await prisma.skill.findMany();
    return skills;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const skill = await prisma.skill.findUnique({
      where: {
        id: id,
      },
    });
    return skill;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Skill) => {
  try {
    const skill = await prisma.skill.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        range: body.range,
      },
    });
    return skill;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const skill = await prisma.skill.delete({
      where: {
        id: id,
      },
    });
    return skill;
  } catch (error) {
    throw error;
  }
};
