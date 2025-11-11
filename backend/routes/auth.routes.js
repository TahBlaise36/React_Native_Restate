import { Router } from "express";
import {
  googleLogin,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const authRouter = Router();

// Define authentication-related routes here
authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

authRouter.post("/google", googleLogin);

export default authRouter;
