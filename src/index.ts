import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import professionRoute from "./routes/profession";
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

app.get("/", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Muham Portofio!" });
});

app.use("/api/auth", authRoutes);
app.use("/api", verifyToken, professionRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
