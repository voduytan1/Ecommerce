import { Router } from "express";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

/**
 * @openapi
 * tags:
 *   name: Cart
 *   description: API quản lý giỏ hàng
 */
const cartRoutes = Router();

/**
 * @openapi
 * /carts:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       200:
 *         description: Sản phẩm đã được thêm vào giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Không tìm thấy token, token hết hạn hoặc không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));

/**
 * @openapi
 * /carts:
 *   get:
 *     summary: Lấy giỏ hàng của người dùng hiện tại
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Giỏ hàng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/CartItem'
 *                   - type: object
 *                     properties:
 *                       product:
 *                         $ref: '#/components/schemas/Product'
 */
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));

/**
 * @openapi
 * /carts/{id}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID mục giỏ hàng
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa khỏi giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted from cart"
 *      401:
 *        description: Không tìm thấy token, token hết hạn hoặc không hợp lệ
 */
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));

/**
 * @openapi
 * /carts/{id}:
 *   post:
 *     summary: Thay đổi số lượng sản phẩm trong giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID mục giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       200:
 *         description: Số lượng đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *      401:
 *       description: Không tìm thấy token, token hết hạn hoặc không hợp lệ
 */
cartRoutes.post("/:id", [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;