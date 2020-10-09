# I. Cart service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: Carts

##### Data structure (Cart object)

| Stt | Tên trường  | Kiểu dữ liệu | Giá mặc định | Bắt buộc |           Mô tả           |
| :-: | :---------: | :----------: | :----------: | :------: | :-----------------------: |
|  1  |    \_id     |   ObjectId   |    random    | required |      Id của cửa hàng      |
|  2  | ListProduct |    Array     |      []      |          |    Danh sách sản phẩm     |
|  3  |  SubTotal   |    Number    |      0       |          |  Tổng số lượng sản phẩm   |
|  4  |   UserId    |   ObjectId   |     true     | required |     Id của khách hàng     |
|  5  |  SubPrice   |    Number    |      0       |          | Tổng tiền tất cả sản phẩm |

## 2. Service info

### Thông tin service \* Tên service: **Cart**

- Source code: ./Controller/CartController.js
- Danh sách routers
  - [2.1: Lấy giỏ hàng của người dùng](#21-Lấy-giỏ-hàng-của-người-dùng)
  - [2.2: Thêm số lượng sản phẩm và sản phẩm vào giỏ hàng](#22-Thêm-số-lượng-sản-phẩm-và-sản-phẩm-vào-giỏ-hàng)
  - [2.3: Giảm số lượng 1 sản phẩm có trong giỏ hàng](#23-giảm-số-lượng-1-sản-phẩm-có-trong-giỏ-hàng)
  - [2.4: Xóa 1 sản phẩm khỏi giỏ hàng](#24-Xóa-1-sản-phẩm-khỏi-giỏ-hàng)
  - [2.5: Xóa tất cả sản phẩm khỏi giỏ hàng ](#25-Xóa-tất-cả-sản-phẩm-khỏi-giỏ-hàng)

### 2.1 Lấy giỏ hàng của người dùng

- Router: **/api/cart**
- Function: **showCartForUser()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Cart object](#data-structure-cart-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.2 Thêm số lượng sản phẩm và sản phẩm vào giỏ hàng

- Router: **/api/cart/add**
- Function: **postshop()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |       Mô tả       |
  | :--------: | :----------: | :---------------: |
  | ProductId  |   ObjectId   |  Id của sản phẩm  |
  |  Quantity  |    Number    | Số lượng sản phẩm |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Cart object](#data-structure-cart-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.3 Giảm số lượng 1 sản phẩm có trong giỏ hàng

- Router: **/api/cart/delete-quantity**
- Function: **delete_Quantity_OfCart()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |       Mô tả       |
  | :--------: | :----------: | :---------------: |
  | ProductId  |   ObjectId   |  Id của sản phẩm  |
  |  Quantity  |    Number    | Số lượng sản phẩm |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Cart object](#data-structure-cart-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.4 Xóa 1 sản phẩm khỏi giỏ hàng

- Router: **/api/cart/delete**
- Function: **delete_All_ForUser()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:
  | Tên Trường | Kiểu dữ liệu |       Mô tả       |
  | :--------: | :----------: | :---------------: |
  | ProductId  |   ObjectId   |  Id của sản phẩm  |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |   Số lượng shop xóa thành công    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.5 Xóa tất cả sản phẩm khỏi giỏ hàng

- Router: **/api/cart/deleteAllProduct**
- Function: **searchShop()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |
  
- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |    Danh sách sản phấm đã xóa    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |
