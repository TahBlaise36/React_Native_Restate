import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.get("/", getBookings);
bookingRouter.get("/:id", getBooking);
bookingRouter.post("/", createBooking);
bookingRouter.put("/:id", updateBooking);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
