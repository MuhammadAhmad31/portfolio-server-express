import prisma from "../config/prisma";
import { Project } from "../types/project.type";

export const createModel = async (body: Project) => {
  try {
    const project = await prisma.newProject.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const projects = await prisma.newProject.findMany();
    return projects;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const project = await prisma.newProject.findUnique({
      where: {
        id: id,
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Project) => {
  try {
    const project = await prisma.newProject.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const project = await prisma.newProject.delete({
      where: {
        id: id,
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};
