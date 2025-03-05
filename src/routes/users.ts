import e, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateUser } from "../controllers/users";
import { get } from "http";

const usersRoutes = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete("/address", [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));

usersRoutes.put("/:id/role", [authMiddleware, adminMiddleware], errorHandler(changeUserRole));
usersRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));
usersRoutes.get("/:id", [authMiddleware, adminMiddleware], errorHandler(getUserById));

export default usersRoutes;
