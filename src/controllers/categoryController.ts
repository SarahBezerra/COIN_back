import { Category } from "@prisma/client";
import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

async function getCategories(req: Request, res: Response) {
  const user = res.locals;

  const categories:Category[] = await categoryService.getCategories(user.id);

  res.status(200).send(categories);
}

export default { 
  getCategories,
};
