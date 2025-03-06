import { Router } from 'express';
import { login, me, signup } from '../controllers/auth';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: Authentication routes
 */

const authRoutes: Router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: "Đăng ký tài khoản mới"
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Đăng ký thành công"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: "Người dùng đã tồn tại"
 *       422:
 *         description: "Dữ liệu không hợp lệ"
 */
authRoutes.post('/signup', errorHandler(signup));
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: "Đăng nhập"
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: "Đăng nhập thành công"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       404:
 *         description: "Không tìm thấy người dùng"
 *       400:
 *         description: "Mật khẩu không đúng"
 */
authRoutes.post('/login', errorHandler(login));

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: "Lấy thông tin người dùng hiện tại"
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "Thông tin người dùng hiện tại"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: "Không được phép truy cập hoặc token không hợp lệ"
 */
authRoutes.get('/me', [authMiddleware], errorHandler(me));

export default authRoutes;