import Review from "../models/review.model.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name avatarUrl")
      .populate("property");

    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      const error = new Error("Review not found!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

export const getPropertyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
    }).populate("user", "name avatarUrl");

    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      const error = new Error("Review not found");
      error.statusCode = 404;
      throw error;
    }

    await review.deleteOne();

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
