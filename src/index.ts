import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import professionRoute from "./routes/profession";
import projectRoute from "./routes/project";
import educationRoute from "./routes/education";
import certificateRoute from "./routes/certificate";
import experienceRoute from "./routes/experience";
import portfolioRoute from "./routes/portfolio";
import skillRoute from "./routes/skill";
import verifyToken from "./middleware/verifyToken";
import secureRoutes from "./middleware/secureRoutes";

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Muham Portofio!" });
});

// public routes
app.use("/auth", authRoutes);

// secure routes
app.use("/api", secureRoutes);
secureRoutes.use("/project", projectRoute);
secureRoutes.use("/profession", professionRoute);
secureRoutes.use("/education", educationRoute);
secureRoutes.use("/certificate", certificateRoute);
secureRoutes.use("/experience", experienceRoute);
secureRoutes.use("/portfolio", portfolioRoute);
secureRoutes.use("/skill", skillRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
