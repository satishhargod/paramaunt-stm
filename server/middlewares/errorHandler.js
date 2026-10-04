export const errorHandler = (res, error) => {
  console.error("🔥 Error:", error.message);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};