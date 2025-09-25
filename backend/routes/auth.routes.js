import { Router } from "express";
import { login, logout, register } from "../controllers/auth.cotroller.js";

const authRouter = Router();

// Define authentication-related routes here
authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

export default authRouter;
