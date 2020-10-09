# I. Unit service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: BrandOrigin

##### Data structure ( BrandOrigin object)

| Stt |    Tên trường     | Kiểu dữ liệu | Giá mặc định | Bắt buộc |                  Mô tả                  |
| :-: | :---------------: | :----------: | :----------: | :------: | :-------------------------------------: |
|  1  |       _id         |   ObjectId   |    random    | required |             Id của đơn vị tính          |
|  2  |       Country     |   String     |              | required |             Tên đơn vị tính             |
|  3  |       Description |   String     |              |          |             Mô tả                       | 

## 2. Service info

### Thông tin service \* Tên service: ** BrandOrigin**

- Source code: ./Controller/unitController.js
- Danh sách routers
 -[2.1: Tạo mới xuất xứ thương hiệu ](#21-tạo-mới-xuất-xứ-thương-hiệu)
 -[2.2: Cập nhật xuất xứ thương hiệu ](#22-cập-nhật-xuất-xứ-thương-hiệu)
 -[2.3: Lấy chi tiết xuất xứ thương hiệu theo id](#23-lấy-chi-tiết-xuất-xứ-thương-hiệu)
 -[2.4: Lấy tất cả xuất xứ thương hiệu](#24-lấy-tất-cả-xuất-xứ-thương-hiệu)
 -[2.5: Xóa xuất xứ thương hiệu theo id](#25-xoá-xuất-xứ-thương-hiệu-theo-id)
 -[2.6: Tìm kiếm xuất xứ thương hiệu](#26-tìm-kiếm-xuất-xứ-thương-hiệu)
 -[2.7: Xóa danh sách xuất xứ thương hiệu](#27-xoá-danh-sách-xuất-xứ-thương-hiệu)
 
 ### 2.1 Tạo mới xuất xứ thương hiệu
- Router: **/api/brandOrigin/add**
- Function: **create_brandOrigin()**
- Method: **POST**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |

- Mô tả nhập dữ liệu:
{
     "Country": "(Tên của xuất xứ thương hiệu)",
     "Description": "(Mô tả )"

}
- Dữ liệu trả về:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.2 Cập nhật xuất xứ thương hiệu

- Router: **/api/brandOrigin/sua/:id**
- Function: **update_brandOrigin**
- Method: **POST**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của brandOrigin |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.3: Lấy chi tiết xuất xứ thương hiệu theo id

- Router: **/api/brandOrigin/get/:id**
- Function: **get_brandOrigin**
- Method: **GET**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của brandOrigin |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.4: Lấy tất cả xuất xứ thương hiệu

- Router: **/api/brandOrigin**
- Function: **getProfile**
- Method: **GET**
- header:

    |  Tên Trường     | Kiểu dữ liệu     |              Mô tả          |  
    |:--------------: |:---------------: |:--------------------------: |  
    | Authorization   |    string        |        Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                   |  
    |:----------:  |:------------:    |:---------------------------------------------: |  
    |   data       |    object        |  [ BrandOrigin object](#data-structure-brandOrigin-object)   |  
    |   status     |    boolean       |  true - Thành công; false - Có lỗi             |  
    |   message    |    string        |  Tin nhắn trả về                               |  

### 2.5: Xóa xuất xứ thương hiệu theo id

- Router: **/api/brandOrigin/xoa/:id**
- Function: **remove_brandOrigin**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của brandOrigin |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ BrandOrigin object](#data-structure-brandOrigin-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.6: Tìm kiếm xuất xứ thương hiệu

- Router: **/api/brandOrigin/search**
- Function: **search_brandOrigin**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |
- Paremeter:
   | Tên Trường | Kiểu dữ liệu |    mặc định    |    Mô tả                |  
   |:----------:|:------------:|:-------------: |:----------------------: |  
   |    Country |   string     |    null        | Từ khóa tìm kiếm        |
   |    page    |   number     |    1           | trang cần xem           |
   |    limit   |   number     |    20          | Số lượng kết quả trả về |
   |    sort    |   object     | {"Date": desc} | Trường sắp xếp          |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |    Danh sách đơn vị tính tìm thấy |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.7: Xóa danh sách xuất xứ thương hiệu

- Router: **/api/brandOrigin/list/delete**
- Function: **remove_list_brandOrigin**
- Method: **POST**
header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |         Mô tả         |
  | :--------: | :----------: | :-------------------: |
  |   listId   |    array     | Danh sách id của brandOrigin |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |   Danh sách  brandorigin xóa thành công    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |