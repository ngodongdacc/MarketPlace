# I. Address service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Address
##### Postman: https://www.getpostman.com/collections/becc3ddcbc33f90f4285 
##### Data structure (Address object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của tài khoản người dùng |
|2| IdUser               | ObjectId  |  | required | id của tài khoản người dùng |
|3| FullName               | String  | null |  | Họ tên của người đặt hàng |
|4| Phone               | String  | null |  | Điện thoại |
|5| Company               | String  | null |  | Công ty |
|6| City               | String  |  | required | Thành phố |
|7| District               | String  |  | required | Quận huyện |
|8| Wards               | String  |  | required | Phường xã |
|9| Address               | String  | required  |  | Địa chỉ gia hàng |
|10| NumAdress               | String  | null |  | địa chỉ(nhà riêng / công ty) |
|11| Default               | Boolean  | false |  | địa chỉ mặc định |
|12| CreateAt         | Date  | now |  | Ngày tạo |
|13| UpdateAt         | Date  | now |  | Ngày cập nhật |

## 2. Service info  
### Thông tin service * Tên service: **Address**  
* Source code: ./Controller/addressController.js  
* Danh sách routers  
   * [2.1: Thêm địa chỉ người dùng](#21--thêm-địa-chỉ-người-dùng)  
   * [2.2: Cập nhật địa chỉ người dùng](#22--cập-nhật-địa-chỉ-người-dùng)  
   * [2.3: Xóa danh sách địa chỉ](#23-xóa-danh-sách-địa-chỉ)
   * [2.4: Tìm kiếm địa chỉ người dùng](#24-tìm-kiếm-địa-chỉ-người-dùng)
  
### 2.1  Thêm địa chỉ người dùng
 - Router: **/api/address**  
 - Function: **add_address()**  
 - Method: **POST**
 - Paremeter: 
 - Header:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    Authorization     |    token |         Token đăng nhập của người dùng      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Address object](#data-structure-address-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Address object](#data-structure-address-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 2.2  Cập nhật địa chỉ người dùng  
 - Router: **/api/address/update/:id**  
 - Function: **update_address()**  
 - Method: **POST**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    ObjectId |         id của địa chỉ      |

 - Header:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    Authorization     |    token |         Token đăng nhập của người dùng      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Address object](#data-structure-address-object)      |
    

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data       |    object        | [ Address object](#data-structure-address-object)  |  
    |   status     |    boolean       | true - thành công, false - thất bại                  |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 2.3 Xóa danh sách địa chỉ  
 - Router: **/api/address/remove/list**  
 - Function: **remove_address()**  
 - Method: **POST**
 - Paremeter: 
- Header:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    Authorization     |    token |         Token đăng nhập của người dùng      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    listId     |    array |         [ Address object](#data-structure-address-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Address object](#data-structure-address-object)     |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.4 Tìm kiếm địa chỉ người dùng  
 - Router: **/api/address/search**  
 - Function: **search_address()**  
 - Method: **POST**
 - Paremeter: 

    | Tên Trường  | Kiểu dữ liệu     |   Mặc định        |    Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string |     null    |từ khóa tìm kiếm      |
    |    limit     |    number |       20  | trả về tối đa      |
    |    page     |    number |       1  |phân trang      |
    |    sort     |    object |       {"CreateAt": -1}  |Sắp xếp      |

 - Header:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    Authorization     |    token |         Token đăng nhập của người dùng      |
    
  - Body:


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Address object](#data-structure-address-object)     |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

