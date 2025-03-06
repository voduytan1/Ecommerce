import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/orders";
import { errorHandler } from "../error-handler";
import adminMiddleware from "../middlewares/admin";

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: "API quản lý đơn hàng"
 */
const ordersRoutes = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: "Tạo đơn hàng mới từ giỏ hàng"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Đơn hàng đã được tạo"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: "Giỏ hàng trống hoặc không có địa chỉ giao hàng"
 *       401:
 *         description: "Token không hợp lệ"
 */
ordersRoutes.post("/", [authMiddleware], errorHandler(createOrder));

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: "Lấy danh sách đơn hàng của người dùng hiện tại"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Danh sách đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: "token không hợp lệ"
 */
ordersRoutes.get("/", [authMiddleware], errorHandler(listOrder));


/**
 * @openapi
 * /orders/{id}/cancel:
 *   put:
 *     summary: "Hủy đơn hàng"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID đơn hàng"
 *     responses:
 *       200:
 *         description: "Đơn hàng đã được hủy"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: "token không hợp lệ"
 *       404:
 *         description: "Không tìm thấy đơn hàng"
 */
ordersRoutes.put("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));

/**
 * @openapi
 * /orders/index:
 *   get:
 *     summary: "Lấy danh sách tất cả đơn hàng (Chỉ Admin)"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Số lượng bản ghi bỏ qua (phân trang)"
 *     responses:
 *       200:
 *         description: "Danh sách đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: "token không hợp lệ hoặc không phải admin"
 */
ordersRoutes.get("/index", [authMiddleware, adminMiddleware], errorHandler(listAllOrders));

/**
 * @openapi
 * /orders/users/{id}:
 *   get:
 *     summary: "Lấy danh sách đơn hàng của một người dùng cụ thể (Chỉ Admin)"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID người dùng"
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: "Số lượng bản ghi bỏ qua (phân trang)"
 *     responses:
 *       200:
 *         description: "Danh sách đơn hàng của người dùng"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: "token không hợp lệ hoặc không phải admin"
 */
ordersRoutes.get("/users/:id", [authMiddleware, adminMiddleware], errorHandler(listUserOrders));

/**
 * @openapi
 * /orders/{id}/status:
 *   put:
 *     summary: "Thay đổi trạng thái đơn hàng (Chỉ Admin)"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID đơn hàng"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACCEPTED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED]
 *                 example: "ACCEPTED"
 *     responses:
 *       200:
 *         description: "Trạng thái đơn hàng đã được cập nhật"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: "token không hợp lệ hoặc không phải admin"
 *       404:
 *         description: "Không tìm thấy đơn hàng"
 */
ordersRoutes.put("/:id/status", [authMiddleware, adminMiddleware], errorHandler(changeStatus));

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: "Lấy thông tin chi tiết đơn hàng"
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID đơn hàng"
 *     responses:
 *       200:
 *         description: "Chi tiết đơn hàng"
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Order'
 *                 - type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/OrderEvent'
 *       401:
 *         description: "token không hợp lệ"
 *       404:
 *         description: "Không tìm thấy đơn hàng"
 */
ordersRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default ordersRoutes;