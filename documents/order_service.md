# I Order service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Order
##### Data structure (Order object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của tài khoản người dùng |
|2| UserId               | ObjectId  |  | required | Id của người dùng |
|3| Products               | Array  | required |  | Sản phẩm của người dùng |
|4| Name               | String  | required |  | Tên người dùng |
|5| Address               | String  | required |  | Địa chỉ người dùng |
|6| Phone               | String  |  | required | Số điện thoại |
|7| Payment               | String |  | null | Hình thước thanh toán |
|8| CodeOrder               | String  |  | null | Phân quyền tài khoản |
|9| Status              | Number | 0 | null | Trang thái đơn hàng |
|10| CreateAt               | Date  | now |  | Ngày tạo mới |
|11| UpdateAt         | Date  | now |  | Ngày cập nhật |
|12| IntoMoney               | Number  | null |  | Tổng tiền |
|13| GrossProduct               | Number  | null |  | tổng sản phẩm |
|14| Reason               | String  | null |  | Lý do huỷ đơn hàng |
|15| IdCart             | ObjectId |  | required | Id Của Giỏ Hàng |


+ Status: 
    | Status  |               Mô tả                  |  
    |:----------:    |:--------------------------------:    |  
    |    0     |           Chờ xác nhận (mặc định)     |
    |    1     |           Đã xác nhận     |
    |    2     |           Đang giao hàng     |
    |    3     |           Đã giao hàng     |
    |    4     |           Đơn hàng bị hủy     |
## 2. Service info  
### Thông tin service * Tên service: **Order**  
* Source code: ./Controller/OrderController.js  
* Danh sách routers  
   * [2.1: Tạo đơn hàng mới](#21--tạo-đơn-hàng-mới)  
   * [2.2: Hủy đơn hàng](#22--hủy-đơn-hàng)  
   * [2.3: Cập nhật trạng thái đơn hàng](#23--cập-nhật-trạng-thái-đơn-hàng)  
   * [2.4: Cập nhật thông tin giao hàng của đơn hàng](#24--cập-nhật-thông-tin-giao-hàng-của-đơn-hàng)
   * [2.5: Tìm kiếm đơn hàng của khách hàng](#25--tìm-kiếm-đơn-hàng-của-khách-hàng)  
   * [2.6: Lấy chi tiết đơn hàng của khách hàng](#26--lấy-chi-tiết-đơn-hàng-của-khách-hàng)
   * [2.7: Xoá danh sách đơn hàng](#27--xoá-danh-sách-đơn-hàng)

### 2.1  Tạo đơn hàng mới
- Router: **/api/order/create**  
 - Function: **create_order()**  
 - Method: **POST**
 - Paremeter: 
 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Order object](#data-structure-order-object)      |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Order object](#data-structure-order-object)    |  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.2  Hủy đơn hàng
- Router: **api/order/cancel/:id**  
 - Function: **/**  
 - Method: **POST**
 - Paremeter: 

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    ObjectId |          id đơn hàng      |

 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ order object](#data-structure-order-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.3  Cập nhật trạng thái đơn hàng
 - Router: **/**  
 - Function: **/**  
 - Method: **POST**
 - Paremeter:
   | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string |          id của order      |
- header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Chi tiết order   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả 
    về                                      |  
    
### 2.4  Cập nhật thông tin giao hàng của đơn hàng
- Router: **/api/order/update-info**  
 - Function: **update_order_infor()**  
 - Method: **POST**
 - Paremeter: 
 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    idOder     |    ObjectId |   id của đơn hàng            |
    |    info     |    object | Thông tin cập nhật               |

    + info :
         | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
        |:----------:  |:------------:    |:--------------------------------:    |  
        |    Name     |    String |   Họ tên nhận hàng            |
        |    Phone     |    String | Số điện thoại người nhận               |
        |    Address     |    String | Địa chỉ người nhận               |
        |    Email     |    String | Email người nhận               |
        |    Payment     |    String | Hình thức giao hàng               |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Order object](#data-structure-order-object)   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.5  Tìm kiếm đơn hàng của khách hàng
- Router: **/api/order/search-users**  
 - Function: **search_order_users()**  
 - Method: **GET**
 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | {"CreateAt": -1} |         Trường sắp xếp      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách đơn hàng tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.6  Lấy chi tiết đơn hàng của khách hàng
- Router: **/api/order/detail/:id**  
 - Function: **get_order()**  
 - Method: **GET**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    id     |    string | null |         id của đơn hàng      |
    
- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách đơn hàng tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về 

### 2.7  Xoá danh sách đơn hàng
- Router: **/api/order/list/delete**  
 - Function: **deleteListOrder()**  
 - Method: **POST**
 - Paremeter: 

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    listIdOrder     |    array |         Danh sách id của order      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Số lượng order xóa thành công   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
