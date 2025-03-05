import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { cancelOrder, createOrder, getOrderById, listOrder } from "../controllers/orders";
import { errorHandler } from "../error-handler";
import adminMiddleware from "../middlewares/admin";


const ordersRoutes = Router();

ordersRoutes.post("/", [authMiddleware], errorHandler(createOrder));
ordersRoutes.get("/", [authMiddleware], errorHandler(listOrder));
ordersRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
ordersRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default ordersRoutes;