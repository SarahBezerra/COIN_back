import { Category } from "@prisma/client";
import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

async function getCategories(req: Request, res: Response) {
  const { user } = res.locals;

  const categories: Category[] = await categoryService.getCategories(user.id);

  res.status(200).send(categories);
}

async function deleteCategory(req: Request, res: Response) {
  const { user } = res.locals;
  const { id: categoryId } = req.params;

  await categoryService.deleteCategory(user.id, Number(categoryId));

  res.sendStatus(200);
}

export default {
  getCategories,
  deleteCategory,
};
