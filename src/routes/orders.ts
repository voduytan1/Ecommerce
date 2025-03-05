import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/orders";
import { errorHandler } from "../error-handler";
import adminMiddleware from "../middlewares/admin";


const ordersRoutes = Router();

ordersRoutes.post("/", [authMiddleware], errorHandler(createOrder));
ordersRoutes.get("/", [authMiddleware], errorHandler(listOrder));
ordersRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
ordersRoutes.get("/index", [authMiddleware, adminMiddleware], errorHandler(listAllOrders));
ordersRoutes.get("/users/:id", [authMiddleware, adminMiddleware], errorHandler(listUserOrders));
ordersRoutes.put("/:id/status", [authMiddleware, adminMiddleware], errorHandler(changeStatus));

ordersRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default ordersRoutes;