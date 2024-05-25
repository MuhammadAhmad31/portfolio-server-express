// src/middleware/secureRoutes.ts
import express, { Request, Response, NextFunction } from "express";
import verifyToken from "./verifyToken";

const secureRoutes = express.Router();

secureRoutes.use(verifyToken);

export default secureRoutes;
