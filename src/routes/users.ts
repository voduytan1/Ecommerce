import e, { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";

const usersRoutes = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete("/address", [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));
export default usersRoutes;
