import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { categorySchema } from "../schemas/categorySchema.js";

const categoryRouter = Router();

categoryRouter.get(
  "/categories",
  ensureAuthenticatedMiddleware,
  categoryController.getCategories
);
categoryRouter.delete(
  "/categories/:id",
  ensureAuthenticatedMiddleware,
  categoryController.deleteCategory
);
categoryRouter.post(
  "/categories/create",
  ensureAuthenticatedMiddleware,
  validateSchemaMiddleware(categorySchema),
  categoryController.createCategory
);

export default categoryRouter;
