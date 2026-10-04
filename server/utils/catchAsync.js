export const catchAsync = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
};