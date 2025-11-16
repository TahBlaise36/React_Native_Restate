import { Router } from "express";
import {
  createFacility,
  deleteFacility,
  getFacilities,
  getFacility,
} from "../controllers/facility.controller.js";

const facilityRouter = Router();

facilityRouter.get("/", getFacilities);
facilityRouter.get("/:id", getFacility);
facilityRouter.post("/", createFacility);
facilityRouter.delete("/:id", deleteFacility);

export default facilityRouter;
