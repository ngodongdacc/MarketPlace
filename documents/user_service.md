# I. User service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Users
##### Data structure (User object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của tài khoản người dùng |
|2| FullName               | String  |  | required | Họ tên của tài khoản người dùng |
|3| Address               | Array  | null |  | Địa chỉ của tài khoản người dùng |
|4| Gender               | Number  | null |  | Giới tính |
|5| Birthday               | Date  | null |  | Ngày sainh dùng |
|6| Email               | String  |  | required | Email |
|7| Password               | String  |  | required | Mật khẩu |
|8| Phone               | String  |  | required | Số điện thoại |
|9| Sale               | Boolean  | false  |  | Nhận chương trình khuyến mãi |
|10| Role               | String  | Basic | required | Phân quyền tài khoản |
|11| Date               | Date  | now |  | Ngày tạo mới |
|12| DateUpdate         | Date  | now |  | Ngày cập nhật |
|13| Avatar               | String  | null |  | Link ảnh đại diện |
|14| Facebook               | Object  | null |  | Đăng nhập bằng facebook |
|15| Email               | Object  | null |  | Đăng nhập bằng Email |

## 2. Service info  
### Thông tin service * Tên service: **User**  
* Source code: ./Controller/UserController.js  
* Danh sách routers  
   * [2.1: Đăng ký tài khoản người dùng](#21--đăng-ký-tài-khoản-người-dùng)  
   * [2.2: Đăng nhập ](#22--đăng-nhập )  
   * [2.3: Cập nhật thông tin tài khoản người dùng ](#23--cập-nhật-thông-tin-tài-khoản-người-dùng)
   * [2.4: Xóa danh sách người dùng](#24--xóa-danh-sách-người-dùng)
   * [2.5: Tìm kiếm tài khoản người dùng ](#25--tìm-kiếm-tài-khoản-người-dùng)
   * [2.6: Lấy thông tin tài khoản](#26--lấy-thông-tin-tài-khoản)
   * [2.7: Lấy thông tin tài khoản người](#27--lấy-thông-tin-tài-khoản-người-dùng)
   
  
### 2.1  Đăng ký tài khoản người dùng
 - Router: **/api/users**  
 - Function: **post_create_user()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ User object](#data-structure-user-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ User object](#data-structure-user-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 2.2  Đăng nhập  
 - Router: **/api/users/login**  
 - Function: **post_login()**  
 - Method: **POST**
 - Paremeter: 

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    Username     |    String |         Tên đăng nhập (Email hoặc số điện thoại)      |
    |    Password     |    String |         Mật khẩu đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data       |    object        | [ User object](#data-structure-user-object) + Token  |  
    |   status     |    boolean       | true - thành công, false - thất bại                  |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 2.3 Cập nhật thông tin tài khoản người dùng  
 - Router: **/api/users/update/:id**  
 - Function: **post_update()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của User      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ User object](#data-structure-user-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ User object](#data-structure-User-object)      |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.4  Xóa danh sách người dùng  
 - Router: **/api/users/remove/list**  
 - Function: **remove_list_user()**  
 - Method: **POST**
 - Paremeter: 

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    listId     |    array |         Danh sách id của User      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Số lượng prouct xóa thành công   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.5  Tìm kiếm tài khoản người dùng  
 - Router: **/api/users/search**  
 - Function: **get_search()**  
 - Method: **GET**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | {"Date": -1} |         Trường sắp xếp      |
   

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.6  Lấy thông tin tài khoản 
 - Router: **/api/users/profile**  
 - Function: **get_profile()**  
 - Method: **GET**
 - Paremeter
 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  [ User object](#data-structure-User-object)   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.7  Lấy thông tin tài khoản người dùng
 - Router: **/api/users/profile/:id**  
 - Function: **get_profile_id()**  
 - Method: **GET**
 - Paremeter
    
    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string (ObjectId) |          id của tài khoản khoản người dùng      |

 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  [ User object](#data-structure-User-object)   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
