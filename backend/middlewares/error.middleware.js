const errorMiddleware = async (err, req, res, next) => {
  try {
    console.error("🔥 Error middleware:", err);
    // Handle different error types
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found with id of ${err.value}`;
      error = new Error(message);
      error.statusCode = 404;
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = `Duplicate field value entered: ${JSON.stringify(
        err.keyValue
      )}`;
      error = new Error(message);
      error.statusCode = 400;
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new Error(message);
      error.statusCode = 400;
    }

    // Default to 500 for all other errors
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
