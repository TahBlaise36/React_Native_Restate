export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    if (req.user.role !== "admin") {
      const error = new Error("Access denied. Admins only.");
      error.statusCode = 403;
      throw error;
    }

    next();
  } catch (err) {
    next(err);
  }
};
