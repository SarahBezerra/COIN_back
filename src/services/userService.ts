import { User } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { conflictError, notFoundError, unauthorizedError } from "../utils/errorUtils.js";
import categoryRepository from "../repositories/categoryRepository.js";
dotenv.config();

export type CreateUserData = Omit<User, "id">;

async function signUp(createUserData: CreateUserData) {
  const { email, password } = createUserData;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw conflictError("Email já cadastrado");

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRepository.insert({ ...createUserData, password: hashedPassword });
  const user = await userRepository.findByEmail(email);
  await categoryRepository.createDefaultCategories(user.id);
}

export type UserLoginData = Omit<User, "id" | "username">;

async function signIn(loginData: UserLoginData) {
  const { email, password } = loginData;

  const user = await userRepository.findByEmail(email);
  if (!user) throw notFoundError("Email não cadastrado");

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) throw unauthorizedError("Senha inválida");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
}

async function findById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError("Usuário não encontado");

  return user;
}

export default {
  signUp,
  signIn,
  findById,
};
