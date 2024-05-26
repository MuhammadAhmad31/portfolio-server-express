import prisma from "../config/prisma";
import { Certificate } from "../types/certificate.type";

export const createModel = async (body: Certificate) => {
  try {
    const certificate = await prisma.certificate.create({
      data: {
        name: body.name,
        institution: body.institution,
        year: body.year,
        credential: body.credential,
        url: body.url,
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const certificates = await prisma.certificate.findMany();
    return certificates;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: {
        id: id,
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};

export const updateModel = async (id: string, body: Certificate) => {
  try {
    const certificate = await prisma.certificate.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        institution: body.institution,
        year: body.year,
        credential: body.credential,
        url: body.url,
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = async (id: string) => {
  try {
    const certificate = await prisma.certificate.delete({
      where: {
        id: id,
      },
    });
    return certificate;
  } catch (error) {
    throw error;
  }
};
