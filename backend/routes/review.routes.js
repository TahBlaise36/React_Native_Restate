import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", getReview);
reviewRouter.post("/", createReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
