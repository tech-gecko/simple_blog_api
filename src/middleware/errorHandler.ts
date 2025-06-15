import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const errorHandler = (
  err: Error | AppError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error("ERROR 💥:", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values((err as any).errors).map(
      (el: any) => el.message
    );
    const message = `Invalid input data: ${errors.join(". ")}`;
    res.status(400).json({
      status: "error",
      message,
    });
    return;
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === "CastError" && (err as any).path === "_id") {
    res.status(400).json({
      status: "error",
      message: `Invalid ID format for path: ${(err as any).value}`,
    });
    return;
  }

  // For unhandled errors, send a generic message
  res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
  return;
};

export default errorHandler;
