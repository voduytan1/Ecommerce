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