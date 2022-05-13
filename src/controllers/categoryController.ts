import { Category } from "@prisma/client";
import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

async function getCategories(req: Request, res: Response) {
  const user = req.body;

  const categories:Category[] = await categoryService.getCategories();

  res.status(200).send(categories);
}

export default { 
  getCategories,
};
