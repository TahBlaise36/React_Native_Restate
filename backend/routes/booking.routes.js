import { Router } from "express";

const bookingRouter = Router();

// Define booking-related routes here
bookingRouter.post("/", (req, res) => {
  res.send({ title: "Create a new booking" });
});

bookingRouter.get("/:id", (req, res) => {
  res.send({ title: "Fetch booking details", id: req.params.id });
});

bookingRouter.get("/", (req, res) => {
  res.send({ title: "Fetch all bookings" });
});

bookingRouter.put("/:id", (req, res) => {
  res.send({ title: "Update booking details", id: req.params.id });
});

bookingRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete booking", id: req.params.id });
});

export default bookingRouter;
