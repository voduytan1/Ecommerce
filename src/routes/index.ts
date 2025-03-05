import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import usersRoutes from "./users";
import cartRoutes from "./cart";
import ordersRoutes from "./orders";
const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/products', productsRoutes);
rootRoutes.use('/users', usersRoutes);
rootRoutes.use('/carts', cartRoutes);
rootRoutes.use('/orders', ordersRoutes);
export default rootRoutes;