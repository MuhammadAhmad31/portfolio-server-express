import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import verifyToken from "./middleware/verifyToken";

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

app.use("/auth", authRoutes);

app.get("/api", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
