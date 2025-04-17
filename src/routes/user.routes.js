import { Router } from "express";

import { userController } from "../controllers/user.controller.js";
import { authSchema } from "../validations/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middlewarse.js";

const router = Router();

router
  .post("/", validateBody(authSchema.signIn), userController.profile)
  .put(
    "/:id",
    authMiddleware,
    validateBody(authUpdateSchema),
    userController.update
  )
  .delete("/:id", authMiddleware, userController.delete);

export { router as userRouter };
