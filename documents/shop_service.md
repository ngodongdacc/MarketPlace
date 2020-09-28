# I. Shop service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: Shops

##### Data structure (Shop object)

| Stt |    Tên trường     | Kiểu dữ liệu | Giá mặc định | Bắt buộc |                  Mô tả                  |
| :-: | :---------------: | :----------: | :----------: | :------: | :-------------------------------------: |
|  1  |       \_id        |   ObjectId   |    random    | required |             Id của cửa hàng             |
|  2  |  StoreOwnername   |    String    |              | required |            Tên chủ cửa hàng             |
|  3  |       Phone       |    String    |              | required |              Số điện thoại              |
|  4  |    EmailOwner     |    String    |              | required |             Email của shop              |
|  5  |   PasswordShop    |    String    |              | required |            Mật khẩu của shop            |
|  6  |     ShopName      |    String    |              | required |              Tên cửa hàng               |
|  7  |  BusinessLicense  |   Boolean    |     true     | required |      Giấy phép kinh doanh cửa hàng      |
|  8  | BusinessRegisCode |    Number    |              | required |            Mã số kinh doanh             |
|  9  |      Country      |    String    |              |          |      Thành phố đăng ký kinh doanh       |
| 10  | CommodityIndustry |    String    |              | required | Loại nghành hàng hóa đăng ký kinh doanh |
| 11  |       Title       |    String    |              |          |                 Tiêu đề                 |
| 12  |        Des        |    String    |              |          |              Mô tả về shop              |

## 2. Service info

### Thông tin service \* Tên service: **Shop**

- Source code: ./Controller/ShopController.js
- Danh sách routers
  - [2.1: Đăng ký tài khoản người dùng shop](#21-đăng-ký-tài-khoản-người-dùng-shop)
  - [2.2: Đăng nhập shop](#22-đăng-nhập)
  - [2.3: Cập nhật thông tin tài khoản người dùng shop](#23-cập-nhật-thông-tin-tài-khoản-người-dùng-shop)
    -- - [2.4: Xóa danh sách người dùng shop](#24-xóa-danh-sách-người-dùng-shop)
  - [2.5: Tìm kiếm tài khoản người dùng shop ](#25-tìm-kiếm-tài-khoản-người-dùng-shop)
  - [2.6: Lấy thông tin tài khoản người dùng shop ](#26-lấy-thông-tin-tài-khoản-người-dùng-shop)

### 2.1 Đăng ký tài khoản người dùng shop

- Router: **/api/shop/add**
- Function: **postshop()**
- Method: **POST**
- Paremeter:
- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Shop object](#data-structure-shop-object) |

- Mô tả nhập dữ liệu:

{
"StoreOwnername": "(Tên chủ cửa hàng)",
"Phone": "(Số điện thoại)",
"EmailOwner": "(Email của shop)",
"PasswordShop": "(Mật khẩu của shop)",
"ShopName": "(Tên cửa hàng )",
"BusinessLicense": (Giấy phép kinh doanh cửa hàng),
"BusinessRegisCode": (Mã số kinh doanh),
"Country": "(Thành phố đăng ký kinh doanh)",
"CommodityIndustry": "(Loại nghành hàng hóa đăng ký kinh doanh)",
"Des" :"(Mô tả về shop)"
}

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Shop object](#data-structure-shop-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.2 Đăng nhập

- Router: **/api/shop/login**
- Function: **post_login()**
- Method: **POST**
- Paremeter:

- Body:

  | Tên Trường | Kiểu dữ liệu |                  Mô tả                   |
  | :--------: | :----------: | :--------------------------------------: |
  |   Email    |    String    | Tên đăng nhập (Email hoặc số điện thoại) |
  |  Password  |    String    |            Mật khẩu đăng nhập            |

- Mô tả nhập dữ liệu:

{
"EmailOwner": "(Email của shop)",
"PasswordShop": "(Mật khẩu của shop)",
}

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                        Mô tả                        |
  | :--------: | :----------: | :-------------------------------------------------: |
  |    data    |    object    | [ Shop object](#data-structure-shop-object) + Token |
  |   status   |   boolean    |         true - thành công, false - thất bại         |
  |  message   |    string    |                   Tin nhắn trả về                   |

### 2.3 Cập nhật thông tin tài khoản người dùng shop

- Router: **/api/shop/update/:id**
- Function: **updateShop()**
- Method: **POST**
- header: // chưa làm đc

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |
- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Shop |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Shop object](#data-structure-shop-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Shop object](#data-structure-shop-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.4 Xóa danh sách người dùng shop

- Router: **/api/shop/delete/list-shop**
- Function: **delete_listShop()**
- Method: **POST**
- header: // chưa làm đc

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |         Mô tả         |
  | :--------: | :----------: | :-------------------: |
  |   listId   |    array     | Danh sách id của User |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |   Số lượng shop xóa thành công    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.5 Tìm kiếm tài khoản người dùng shop

- Router: **/api/shop/search**
- Function: **searchShop()**
- Method: **POST**
- header: // chưa làm đc

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |
- Paremeter:
  | Tên Trường | Kiểu dữ liệu | mặc định | Mô tả |  
   |:----------: |:------------:|:------------: |:--------------------------------: |  
   | ShopName | string | null | Từ khóa tìm kiếm |
  | Country | string | null | Từ khóa tìm kiếm |
  | CommodityIndustry | string | null | Từ khóa tìm kiếm |
  | StoreOwnername | string | null | Từ khóa tìm kiếm |
  | page | number | 1 | trang cần xem |
  | limit | number | 20 | Số lượng kết quả trả về |
  | sort | object | {"ShopName": desc} | Trường sắp xếp |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |    Danh sách sản phấm tìm thấy    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.6 Lấy thông tin tài khoản người dùng shop

- Router: **/api/shop/shop-details**
- Function: **shop_details_forIdOwnerShop()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Shop object](#data-structure-shop-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |