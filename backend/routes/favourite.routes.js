import { Router } from "express";

const favouriteRouter = Router();

// Define favourite-related routes here
favouriteRouter.post("/", (req, res) => {
  res.send({ title: "Add to favourites" });
});

favouriteRouter.get("/", (req, res) => {
  res.send({ title: "Get all favourites" });
});

favouriteRouter.delete("/:id", (req, res) => {
  res.send({ title: "Remove from favourites", id: req.params.id });
});

export default favouriteRouter;
