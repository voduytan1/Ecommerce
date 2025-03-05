import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import usersRoutes from "./users";
import cartRoutes from "./cart";
const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/products', productsRoutes);
rootRoutes.use('/users', usersRoutes);
rootRoutes.use('/carts', cartRoutes);

export default rootRoutes;