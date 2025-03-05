# ORM
## 1. ORM là gì?
ORM (Object-Relational Mapping) là một kỹ thuật lập trình cho phép chuyển đổi dữ liệu giữa hệ thống cơ sở dữ liệu quan hệ và các đối tượng trong ngôn ngữ lập trình hướng đối tượng.

Nói một cách đơn giản, ORM giúp chúng ta tương tác với database(db) bằng cách sử dụng các đối tượng thay cho việc truy vấn SQL.

Có các ORM phổ biến trong Node.js: Sequelize, TypeORM, và Prisma.

## 2. So sánh với Query Builder (Knext.js)
** Đầu tiên, ta tìm hiểu Query Builder là gì?
Query Builder là một công cụ hoặc thư viện phần mềm giúp tạo ra các câu truy vấn (queries) cho cơ sở dữ liệu mà không cần phải viết trực tiếp mã SQL thủ công.
** So sánh:
1. Hướng đối tượng:

- ORM: Làm việc chủ yếu với các đối tượng, cho phép tư duy theo mô hình hướng đối tượng thay vì theo bảng.

- Knex.js: Vẫn làm việc trực tiếp với các khái niệm SQL như bảng, cột.

2. Hiệu suất:

- ORM: Có thể chậm hơn trong một số trường hợp do lớp trừu tượng bổ sung.

Có thể tạo ra các truy vấn không tối ưu nếu không được cấu hình đúng cách.

- Knext.js: Thường nhanh hơn vì gần với SQL hơn.

Ít xử lý dữ liệu hơn sau khi truy vấn.

Cho phép kiểm soát tốt hơn đối với các truy vấn được tạo ra.

# Restful API
## 1. Restful API là gì? 
RESTful API (Representational State Transfer) là một kiểu kiến trúc cho các dịch vụ web, cho phép các hệ thống giao tiếp với nhau qua HTTP. RESTful API sử dụng các phương thức HTTP (GET, POST, PUT, DELETE) để thực hiện các thao tác trên tài nguyên (resources) được định danh bằng các URL.

Các đặc điểm chính của RESTful API bao gồm:

Stateless: Mỗi yêu cầu từ client đến server đều chứa đầy đủ thông tin cần thiết và không lưu trạng thái giữa các yêu cầu.

Client-Server: Client và server được tách biệt, mỗi bên có vai trò và trách nhiệm riêng.

Cacheable: Các phản hồi có thể được cache để giảm tải cho server.

Uniform Interface: Các API có giao diện thống nhất, giúp dễ dàng truy cập và sử dụng tài nguyên.

Layered System: Kiến trúc có thể được chia thành các lớp để tăng cường tính mở rộng và bảo mật.

## 2. So sánh với việc trả về view-engine
** RESTful API **
- Phân chia rõ ràng giữa frontend và backend
- Không lưu trạng thái: Mỗi yêu cầu chứa tất cả thông tin cần thiết
- trả về dữ liệu thô (thường là JSON) thay vì HTML đã định dạng
- Có thể phục vụ nhiều loại client (web, di động, IoT)

** View-Engine **
- Render phía máy chủ: HTML được tạo ra trên máy chủ
- Sử dụng tệp mẫu với placeholder cho nội dung động
- Máy chủ xử lý yêu cầu và trả về HTML hoàn chỉnh

** Ưu điểm của RESTful API **
- Linh hoạt: Frontend có thể được phát triển độc lập bằng bất kỳ framework nào
- Khả năng mở rộng: Dễ dàng mở rộng vì backend và frontend có thể mở rộng riêng biệt
- Khả năng tái sử dụng: Cùng một API có thể phục vụ web, di động và tích hợp bên thứ ba
- Hiệu suất: Có thể hiệu quả hơn vì chỉ truyền dữ liệu tối thiểu

** Nhược điểm của RESTful API **
- Tối ưu SEO phức tạp hơn: Khó khăn trong việc tối ưu SEO cho ứng dụng client-side rendering
- Tải trang chậm ban đầu: SPA sử dụng REST API thường cần thời gian tải ban đầu dài hơn
- Over-fetching: Trả về nhiều dữ liệu hơn mức cần thiết khi client chỉ cần một phần thông tin