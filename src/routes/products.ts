import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProduct, searchProduct, updateProduct } from "../controllers/product";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */
const productsRoutes = Router();
/**
 * @openapi
 * /products:
 *   post:
 *     summary: Tạo sản phẩm mới (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - tags
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone XYZ"
 *               description:
 *                 type: string
 *                 example: "Latest model with high-end features"
 *               price:
 *                 type: number (Decimal)
 *                 example: 599
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["electronics", "smartphone", "new"]
 *     responses:
 *       200:
 *         description: Sản phẩm đã được tạo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Không có token, token sai hoặc hết hạn hoặc không có quyền admin
 */
productsRoutes.post('/',[authMiddleware, adminMiddleware],errorHandler(createProduct));


/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Không có token, token sai hoặc hết hạn hoặc không có quyền admin
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
productsRoutes.put('/:id',[authMiddleware, adminMiddleware],errorHandler(updateProduct));

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Không có token, token sai hoặc hết hạn hoặc không có quyền admin
 *       404:
 *         description: Không tìm thấy sản phẩm
 */

productsRoutes.delete('/:id',[authMiddleware, adminMiddleware],errorHandler(deleteProduct));


/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lấy danh sách sản phẩm có phân trang (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Số lượng bản ghi bỏ qua (phân trang)
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 42
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *        401:
 *         description: Không có token, token sai hoặc hết hạn hoặc không có quyền admin
 */
productsRoutes.get('/',[authMiddleware, adminMiddleware],errorHandler(listProduct));

/**
 * @openapi
 * /products/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm
 *     tags: [Products]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productsRoutes.get('/search',[authMiddleware],errorHandler(searchProduct));


/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo ID (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Thông tin sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Không có token, token sai hoặc hết hạn hoặc không có quyền admin
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
productsRoutes.get('/:id',[authMiddleware, adminMiddleware],errorHandler(getProductById));


export default productsRoutes;  