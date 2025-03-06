import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../error-handler";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateUser } from "../controllers/users";
import { get } from "http";

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: "API quản lý người dùng và địa chỉ"
 */
const usersRoutes = Router();

/**
 * @openapi
 * /users/address:
 *   post:
 *     summary: "Thêm địa chỉ mới"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lineOne
 *               - pinCode
 *               - country
 *               - city
 *             properties:
 *               lineOne:
 *                 type: string
 *                 example: "123 Main Street"
 *               lineTwo:
 *                 type: string
 *                 nullable: true
 *                 example: "Apt 4B"
 *               pinCode:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 6
 *                 example: "123456"
 *               country:
 *                 type: string
 *                 example: "Vietnam"
 *               city:
 *                 type: string
 *                 example: "Ho Chi Minh City"
 *     responses:
 *       200:
 *         description: "Địa chỉ đã được thêm"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       401:
 *         description: "token không hợp lệ"
 *       404:
 *         description: "Người dùng không tồn tại"
 */
usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));

/**
 * @openapi
 * /users/address:
 *   delete:
 *     summary: "Xóa địa chỉ"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID địa chỉ"
 *     responses:
 *       200:
 *         description: "Địa chỉ đã được xóa"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Address deleted"
 *       404:
 *         description: "Không tìm thấy địa chỉ"
 */
usersRoutes.delete("/address", [authMiddleware], errorHandler(deleteAddress));

/**
 * @openapi
 * /users/address:
 *   get:
 *     summary: "Lấy danh sách địa chỉ của người dùng hiện tại"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Danh sách địa chỉ"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */

usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));

/**
 * @openapi
 * /users:
 *   put:
 *     summary: "Cập nhật thông tin người dùng"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Smith"
 *               defaultShippingAddress:
 *                 type: integer
 *                 example: 1
 *               defaultBillingAddress:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: "Thông tin người dùng đã được cập nhật"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: "Không tìm thấy địa chỉ"
 *       400:
 *         description: "Địa chỉ không thuộc về người dùng"
 */
usersRoutes.put("/", [authMiddleware], errorHandler(updateUser));

/**
 * @openapi
 * /users/{id}/role:
 *   put:
 *     summary: "Thay đổi vai trò của người dùng (chỉ dành cho admin)"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID của người dùng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: "Vai trò người dùng đã được thay đổi"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: "token không hợp lệ hoặc không có quyền admin"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
usersRoutes.put("/:id/role", [authMiddleware, adminMiddleware], errorHandler(changeUserRole));

/**
 * @openapi
 * /users:
 *   get:
 *     summary: "Lấy danh sách người dùng (chỉ dành cho admin)"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Số lượng bản ghi bỏ qua (để phân trang)"
 *     responses:
 *       200:
 *         description: "Danh sách người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: "token không hợp lệ hoặc không có quyền admin"
 */
usersRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: "Lấy thông tin chi tiết người dùng theo ID (chỉ dành cho admin)"
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID của người dùng"
 *     responses:
 *       200:
 *         description: "Thông tin chi tiết người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: "token không hợp lệ hoặc không có quyền admin"
 *       404:
 *         description: "Không tìm thấy người dùng"
 */
usersRoutes.get("/:id", [authMiddleware, adminMiddleware], errorHandler(getUserById));

export default usersRoutes;