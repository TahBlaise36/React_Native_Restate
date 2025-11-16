import { Router } from "express";
import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "../controllers/property.controller.js";

const propertyRouter = Router();

propertyRouter.get("/", getProperties);
propertyRouter.get("/:id", getProperty);
propertyRouter.post("/", createProperty);
propertyRouter.put("/:id", updateProperty);
propertyRouter.delete("/:id", deleteProperty);

export default propertyRouter;
