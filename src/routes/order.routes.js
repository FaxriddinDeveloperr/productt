import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewarse.js";
import { orderController } from "../controllers/order.controller.js";
export const orderRouter = Router();

orderRouter
  .post("/",authMiddleware, orderController.create)
  .get("/", orderController.findAll)
  .get("/:id", orderController.findOne)
  .put("/:id",authMiddleware, orderController.update)
  .delete("/:id",authMiddleware, orderController.delete);
