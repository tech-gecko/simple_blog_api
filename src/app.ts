import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import postRoutes from "./routes/postRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Blog API is running..." });
});

app.use("/api/posts", postRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
