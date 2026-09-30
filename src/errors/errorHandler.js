function errorHandler(err, req, res, next) {
  console.error("ERROR:", err.message);

  if (err.response) {
    console.error("UPSTREAM STATUS:", err.response.status);
    console.error("UPSTREAM DATA:", err.response.data);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message || "Internal server error",
    },
  });
}

module.exports = errorHandler;