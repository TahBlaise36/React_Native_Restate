import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";

const userRouter = Router();

// Define user-related routes here
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", (req, res) => {
  res.send({ title: `Update user with ID ${req.params.id}` });
});
userRouter.delete("/:id", deleteUser);

export default userRouter;
