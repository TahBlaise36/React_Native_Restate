import { Router } from "express";

const userRouter = Router();

// Define user-related routes here
userRouter.get("/", (req, res) => {
  res.send({ title: "Get all users" });
});
userRouter.get("/:id", (req, res) => {
  res.send({ title: `Get user with ID ${req.params.id}` });
});
userRouter.put("/:id", (req, res) => {
  res.send({ title: `Update user with ID ${req.params.id}` });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ title: `Delete user with ID ${req.params.id}` });
});

export default userRouter;
