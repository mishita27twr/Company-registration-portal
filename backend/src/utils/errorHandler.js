export const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err); // full log

  res.status(500).json({
    message: err.message || "Internal server error",
    error: err,
  });
};