class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // To distinguish between operational and programmer errors

    Object.setPrototypeOf(this, AppError.prototype); // Ensure 'instanceof' works correctly
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}

export default AppError;
