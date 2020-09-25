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
|10| Date               | Date  | now |  | Ngày tạo mới |
|11| DateUpdate         | Date  | now |  | Ngày cập nhật |
|12| IntoMoney               | Number  | null |  | Tổng tiền |
|13| GrossProduct               | Number  | null |  | tổng sản phẩm |
|14| Reason               | String  | null |  | Lý do huỷ đơn hàng |
|15| IdCart             | ObjectId |  | required | Id Của Giỏ Hàng |

## 2. Service info  
### Thông tin service * Tên service: **Order**  
* Source code: ./Controller/OrderCOntroller.js  
* Danh sách routers  
   * [2.1: Tạo mới 1 đơn hàng](#21--Tạo-mới-1-đơn-hàng)  
   * [2.2: Câp nhập 1 đơn hàng](#22--Cập-nhập-1-đơn-hàng)  
   * [2.3: Lấy ra chi tiết 1 đơn hàng](#23--Lấy-ra-chi-tiết-1-đơn-hàng)  
   * [2.4: Xoá 1 đơn hàng](#2--Xoá-1-đơn-hàng)
   * [2.5: Lấy ra danh sách đơn hàng theo ID người dùng](#2--Lấy-ra-danh-sách-đơn-hàng-theo-ID-người-dùng)  
   * [2.6: Lấy ra danh sách đơn hàng theo ID giỏ hàng](#2--Lấy-ra-danh-sách-đơn-hàng-theo-ID-giỏ-hàng)
   * [2.7: Xoá danh sách đơn hàng](#2--Xoá-danh-sách-đơn-hàng)


### 2.1  Tạo mới 1 đơn hàng
- Router: **/api/order**  
 - Function: **createOrder()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ User object](#data-structure-user-object)      |

- Mô tả nhập dữ liệu: 

{
    "UserId": "(ID người dùng)",
    "Products": "(((Không cần điền)))",
    "Name": "Tên",
    "IdCart": "Id giỏ hàng",
    "Stautus": "(Mặc định = 0 rồi )",
    "Phone": "(Số điện thoại khách hàng)",
    "Address": "(Địa chỉ khách hàng)",
    "Payment": "(Hình thức thanh toán)",
    "IntoMoney": "(((Không cần điền)))",
    "GrossProduct": "(((Không cần điền)))"
}

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ User object](#data-structure-user-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  

## 2.2 Câp nhập 1 đơn hàng
- Router: **/api/order/(id order cần update)**  
 - Function: **updateOrder()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ User object](#data-structure-user-object)      |

- Mô tả nhập dữ liệu: 

{
    "Products": "",
    "Name": "Tên",
    "Stautus": "",
    "Phone": "",
    "Address": "",
    "Payment": "",
    "IntoMoney": "",
    "GrossProduct": "",
    "Reason": ""
}

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ User object](#data-structure-user-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  

## 2.3 Lấy ra chi tiết 1 đơn hàng
 - Router: **/api/get/(id order)**  
 - Function: **getOrder()**  
 - Method: **GET**
 - Paremeter:
   | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string |          id của order      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Chi tiết order   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả 
    về                                      |  
    
## 2.4 Xoá 1 đơn hàng
- Router: **/api/delete/:id**  
 - Function: **deleteOrder()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của order      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Order object](#data-structure-product-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Order object](#data-structure-product-object)  + token    |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

## 2.5 Lấy ra danh sách đơn hàng theo ID người dùng
- Router: **/api/getOrderByUsers**  
 - Function: **getOrderByIdUsers()**  
 - Method: **GET**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | {"Date": -1} |         Trường sắp xếp      |
    |    idOrder     |    string | null |         Id của đơn hàng      |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

## 2.6 Lấy ra danh sách đơn hàng theo ID giỏ hàng
- Router: **/api/getOrderByCart**  
 - Function: **getOrderByCart()**  
 - Method: **GET**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | {"Date": -1} |         Trường sắp xếp      |
    |    idCart     |    string | null |         Id của giỏ hàng     |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách đơn hàng tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về 

## 2.7 Xoá danh sách đơn hàng
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
