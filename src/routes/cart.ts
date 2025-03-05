import { Router } from "express";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";


const cartRoutes = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.post("/:id", [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;