/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID người dùng
 *         name:
 *           type: string
 *           description: Tên người dùng
 *         email:
 *           type: string
 *           format: email
 *           description: Email người dùng
 *         password:
 *           type: string
 *           description: Mật khẩu đã mã hóa
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           description: Vai trò người dùng
 *         defaultShippingAddress:
 *           type: integer
 *           nullable: true
 *           description: ID địa chỉ giao hàng mặc định
 *         defaultBillingAddress:
 *           type: integer
 *           nullable: true
 *           description: ID địa chỉ thanh toán mặc định
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID sản phẩm
 *         name:
 *           type: string
 *           description: Tên sản phẩm
 *         description:
 *           type: string
 *           description: Mô tả sản phẩm
 *         price:
 *           type: number
 *           description: Giá sản phẩm
 *         tags:
 *           type: string
 *           description: Các thẻ sản phẩm, phân tách bằng dấu phẩy
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID địa chỉ
 *         lineOne:
 *           type: string
 *           description: Dòng địa chỉ 1
 *         lineTwo:
 *           type: string
 *           nullable: true
 *           description: Dòng địa chỉ 2
 *         city:
 *           type: string
 *           description: Thành phố
 *         country:
 *           type: string
 *           description: Quốc gia
 *         pinCode:
 *           type: string
 *           description: Mã bưu điện
 *         userId:
 *           type: integer
 *           description: ID người dùng sở hữu địa chỉ
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID mục giỏ hàng
 *         userId:
 *           type: integer
 *           description: ID người dùng sở hữu
 *         productId:
 *           type: integer
 *           description: ID sản phẩm
 *         quantity:
 *           type: integer
 *           description: Số lượng
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID đơn hàng
 *         userId:
 *           type: integer
 *           description: ID người dùng đặt hàng
 *         netAmount:
 *           type: number
 *           description: Tổng giá trị đơn hàng
 *         address:
 *           type: string
 *           description: Địa chỉ giao hàng
 *         status:
 *           type: string
 *           enum: [PENDING, SHIPPED, DELIVERED, CANCELLED]
 *           description: Trạng thái đơn hàng
 *     OrderEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID sự kiện đơn hàng
 *         orderId:
 *           type: integer
 *           description: ID đơn hàng
 *         status:
 *           type: string
 *           enum: [PENDING, SHIPPED, DELIVERED, CANCELLED]
 *           description: Trạng thái đơn hàng
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo sự kiện
 */ 