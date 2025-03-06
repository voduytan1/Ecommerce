# API Documentation

## Auth
1. signup
- URL: .../api/auth/signup
- Header: không có
- Body: cần có 3 trường: email, password, name.
- Phản hồi kỳ vọng: status 200, đăng ký thành công, trả về json thông tin người dùng đã đăng ký.
- Phản hồi lỗi: 400, Người dùng đã tồn tại.
- Phản hồi lỗi: 422, Dữ liệu không hợp lệ.

2. login
- URL: .../api/auth/login
- Header: không có
- Body: Cần có 2 trường: email, password.
- Phản hồi kỳ vọng: 200, Đăng nhập thành công, trả về json thông tin người dùng và token đăng nhập.
- Phản hồi lỗi: 400, Mật khẩu không đúng.
- Phản hồi lỗi: 404, Không tìm thấy người dùng.

3. me (Lấy thông tin người dùng hiện tại)
- URL: .../api/auth/me
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Thông tin người dùng hiện tại, trả về json thông tin người dùng.
- Phản hồi lỗi: 401, Không được phép truy cập hoặc token không hợp lệ.

## Products
1. createProduct (Tạo sản phẩm mới - Chỉ Admin)
- URL: .../api/products
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 4 trường: name, price, description, tags.
- Phản hồi kỳ vọng: 200, Sản phẩm đã được tạo, trả về json thông tin sản phẩm.
- Phản hồi lỗi: 401, Không có token, token sai hoặc hết hạn hoặc không có quyền admin.

2. updateProduct (Cập nhật sản phẩm - Chỉ Admin)
- URL: .../api/products/:id
- Header: trường "Authorization" mang giá trị token.
- Body: có thể chứa các trường: name, description, price, tags.
- Phản hồi kỳ vọng: 200, Sản phẩm đã được cập nhật, trả về json thông tin sản phẩm đã cập nhật.
- Phản hồi lỗi: 401, Không có token, token sai hoặc hết hạn hoặc không có quyền admin.
- Phản hồi lỗi: 404, Không tìm thấy sản phẩm.

3. deleteProduct (Xóa sản phẩm - Chỉ Admin)
- URL: .../api/products/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Sản phẩm đã được xóa, trả về json thông tin sản phẩm đã xóa.
- Phản hồi lỗi: 401, Không có token, token sai hoặc hết hạn hoặc không có quyền admin.
- Phản hồi lỗi: 404, Không tìm thấy sản phẩm.

4. listProduct (Lấy danh sách sản phẩm có phân trang - Chỉ Admin)
- URL: .../api/products
- Header: trường "Authorization" mang giá trị token.
- Query params: skip (mặc định là 0)
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách sản phẩm, trả về json chứa count và data (mảng sản phẩm).
- Phản hồi lỗi: 401, Không có token, token sai hoặc hết hạn hoặc không có quyền admin.

5. searchProduct (Tìm kiếm sản phẩm)
- URL: .../api/products/search
- Header: trường "Authorization" mang giá trị token.
- Query params: q (từ khóa tìm kiếm, bắt buộc)
- Body: không có
- Phản hồi kỳ vọng: 200, Kết quả tìm kiếm, trả về json mảng sản phẩm.
- Phản hồi lỗi: 401, Token không hợp lệ.

6. getProductById (Lấy thông tin sản phẩm theo ID - Chỉ Admin)
- URL: .../api/products/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Thông tin sản phẩm, trả về json thông tin sản phẩm.
- Phản hồi lỗi: 401, Không có token, token sai hoặc hết hạn hoặc không có quyền admin.
- Phản hồi lỗi: 404, Không tìm thấy sản phẩm.

## Cart
1. addItemToCart (Thêm sản phẩm vào giỏ hàng)
- URL: .../api/carts
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 2 trường: productId, quantity.
- Phản hồi kỳ vọng: 200, Sản phẩm đã được thêm vào giỏ hàng, trả về json thông tin mục giỏ hàng.
- Phản hồi lỗi: 401, Không tìm thấy token, token hết hạn hoặc không hợp lệ.
- Phản hồi lỗi: 404, Không tìm thấy sản phẩm.

2. getCart (Lấy giỏ hàng của người dùng hiện tại)
- URL: .../api/carts
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Giỏ hàng của người dùng, trả về json mảng các mục giỏ hàng với thông tin sản phẩm.
- Phản hồi lỗi: 401, Token không hợp lệ.

3. deleteItemFromCart (Xóa sản phẩm khỏi giỏ hàng)
- URL: .../api/carts/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Sản phẩm đã được xóa khỏi giỏ hàng, trả về json thông tin mục giỏ hàng đã xóa.
- Phản hồi lỗi: 401, Không tìm thấy token, token hết hạn hoặc không hợp lệ.

4. changeQuantity (Thay đổi số lượng sản phẩm trong giỏ hàng)
- URL: .../api/carts/:id
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 1 trường: quantity (tối thiểu là 1).
- Phản hồi kỳ vọng: 200, Số lượng đã được cập nhật, trả về json thông tin mục giỏ hàng đã cập nhật.
- Phản hồi lỗi: 401, Không tìm thấy token, token hết hạn hoặc không hợp lệ.

## Orders
1. createOrder (Tạo đơn hàng mới từ giỏ hàng)
- URL: .../api/orders
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Đơn hàng đã được tạo, trả về json thông tin đơn hàng.
- Phản hồi lỗi: 400, Giỏ hàng trống hoặc không có địa chỉ giao hàng.
- Phản hồi lỗi: 401, Token không hợp lệ.

2. listOrder (Lấy danh sách đơn hàng của người dùng hiện tại)
- URL: .../api/orders
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách đơn hàng, trả về json mảng đơn hàng.
- Phản hồi lỗi: 401, Token không hợp lệ.

3. cancelOrder (Hủy đơn hàng)
- URL: .../api/orders/:id/cancel
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Đơn hàng đã được hủy, trả về json thông tin đơn hàng đã hủy.
- Phản hồi lỗi: 401, Token không hợp lệ.
- Phản hồi lỗi: 404, Không tìm thấy đơn hàng.

4. listAllOrders (Lấy danh sách tất cả đơn hàng - Chỉ Admin)
- URL: .../api/orders/index
- Header: trường "Authorization" mang giá trị token.
- Query params: skip (mặc định là 0)
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách đơn hàng, trả về json mảng đơn hàng.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không phải admin.

5. listUserOrders (Lấy danh sách đơn hàng của một người dùng cụ thể - Chỉ Admin)
- URL: .../api/orders/users/:id
- Header: trường "Authorization" mang giá trị token.
- Query params: skip (mặc định là 0)
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách đơn hàng của người dùng, trả về json mảng đơn hàng.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không phải admin.

6. changeStatus (Thay đổi trạng thái đơn hàng - Chỉ Admin)
- URL: .../api/orders/:id/status
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 1 trường: status (giá trị thuộc enum: PENDING, ACCEPTED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED).
- Phản hồi kỳ vọng: 200, Trạng thái đơn hàng đã được cập nhật, trả về json thông tin đơn hàng đã cập nhật.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không phải admin.
- Phản hồi lỗi: 404, Không tìm thấy đơn hàng.

7. getOrderById (Lấy thông tin chi tiết đơn hàng)
- URL: .../api/orders/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Chi tiết đơn hàng, trả về json thông tin đơn hàng kèm theo sản phẩm và sự kiện.
- Phản hồi lỗi: 401, Token không hợp lệ.
- Phản hồi lỗi: 404, Không tìm thấy đơn hàng.

## Users
1. addAddress (Thêm địa chỉ mới)
- URL: .../api/users/address
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 4 trường: lineOne, pinCode, country, city. Trường lineTwo là tùy chọn.
- Phản hồi kỳ vọng: 200, Địa chỉ đã được thêm, trả về json thông tin địa chỉ.
- Phản hồi lỗi: 401, Token không hợp lệ.
- Phản hồi lỗi: 404, Người dùng không tồn tại.

2. deleteAddress (Xóa địa chỉ)
- URL: .../api/users/address/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Địa chỉ đã được xóa, trả về json thông báo.
- Phản hồi lỗi: 404, Không tìm thấy địa chỉ.

3. listAddress (Lấy danh sách địa chỉ của người dùng hiện tại)
- URL: .../api/users/address
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách địa chỉ, trả về json mảng địa chỉ.
- Phản hồi lỗi: 401, Token không hợp lệ.

4. updateUser (Cập nhật thông tin người dùng)
- URL: .../api/users
- Header: trường "Authorization" mang giá trị token.
- Body: có thể chứa các trường: name, defaultShippingAddress, defaultBillingAddress.
- Phản hồi kỳ vọng: 200, Thông tin người dùng đã được cập nhật, trả về json thông tin người dùng đã cập nhật.
- Phản hồi lỗi: 404, Không tìm thấy địa chỉ.
- Phản hồi lỗi: 400, Địa chỉ không thuộc về người dùng.

5. changeUserRole (Thay đổi vai trò của người dùng - Chỉ Admin)
- URL: .../api/users/:id/role
- Header: trường "Authorization" mang giá trị token.
- Body: cần có 1 trường: role.
- Phản hồi kỳ vọng: 200, Vai trò người dùng đã được thay đổi, trả về json thông tin người dùng đã cập nhật.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không có quyền admin.
- Phản hồi lỗi: 404, Không tìm thấy người dùng.

6. listUsers (Lấy danh sách người dùng - Chỉ Admin)
- URL: .../api/users
- Header: trường "Authorization" mang giá trị token.
- Query params: skip (mặc định là 0)
- Body: không có
- Phản hồi kỳ vọng: 200, Danh sách người dùng, trả về json mảng người dùng.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không có quyền admin.

7. getUserById (Lấy thông tin chi tiết người dùng theo ID - Chỉ Admin)
- URL: .../api/users/:id
- Header: trường "Authorization" mang giá trị token.
- Body: không có
- Phản hồi kỳ vọng: 200, Thông tin chi tiết người dùng, trả về json thông tin người dùng.
- Phản hồi lỗi: 401, Token không hợp lệ hoặc không có quyền admin.
- Phản hồi lỗi: 404, Không tìm thấy người dùng.
