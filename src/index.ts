import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import professionRoute from "./routes/profession";
import projectRoute from "./routes/project";
import educationRoute from "./routes/education";
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

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Muham Portofio!" });
});

app.use("/auth", authRoutes);

// secure routes
app.use("/api", secureRoutes);
secureRoutes.use("/project", projectRoute);
secureRoutes.use("/profession", professionRoute);
secureRoutes.use("/education", educationRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
