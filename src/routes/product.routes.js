import { Router } from "express";
import { productController } from "../controllers/index.js";
import { productSchema } from "../validations/index.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middlewarse.js";

export const productRouter = Router();

productRouter
  .post("/",authMiddleware, validateBody(productSchema), productController.create)
  .get("/", productController.findAll)
  .get("/:id", productController.findOne)
  .put("/:id",authMiddleware, productController.update)
  .delete("/:id",authMiddleware, productController.delete);
