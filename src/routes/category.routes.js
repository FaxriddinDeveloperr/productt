import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { categorySchema } from "../validations/index.js";
import { authMiddleware } from "../middlewares/auth.middlewarse.js";

export const categoryRouter = Router();

categoryRouter
  .post("/",authMiddleware, validateBody(categorySchema), categoryController.create)
  .get("/", categoryController.findAll)
  .get("/:id", categoryController.findOne)
  .put("/:id",authMiddleware, categoryController.update)
  .delete("/:id",authMiddleware, categoryController.delete);
