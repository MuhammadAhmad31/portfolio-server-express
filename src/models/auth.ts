import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { Auth } from "../types/auth.type";
import { PrismaClient } from '@prisma/client'
import prisma from "../config/prisma";

export const registerModel = async (body: Auth) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    // Cek apakah email sudah ada di database
    const existingUser = await prisma.auth.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const auth = await prisma.auth.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return auth;
  } catch (error) {
    throw error;
  }
};

export const loginModel = async (email: string, password: string) => {
  try {
    const user = await prisma.auth.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(payload);

    return { user, token };
  } catch (error) {
    throw error;
  }
};