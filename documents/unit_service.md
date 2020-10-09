# I. Unit service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: Unit

##### Data structure (Unit object)

| Stt |    Tên trường     | Kiểu dữ liệu | Giá mặc định | Bắt buộc |                  Mô tả                  |
| :-: | :---------------: | :----------: | :----------: | :------: | :-------------------------------------: |
|  1  |       _id         |   ObjectId   |    random    | required |             Id của đơn vị tính          |
|  2  |       Name        |   String     |              | required |             Tên đơn vị tính             |
|  3  |       IdCatgoris  |   Array      |              |          |             Danh sách Id danh mục       |
|  4  |       Description |   String     |              |          |             Mô tả                       | 

## 2. Service info

### Thông tin service \* Tên service: **Unit**

- Source code: ./Controller/unitController.js
- Danh sách routers
 -[2.1: Tạo mới đơn vị tính](#21-tạo-mơi-đơn-vị-tính)
 -[2.2: Cập nhật đơn vị tính](#22-cập-nhật-đơn-vị-tính)
 -[2.3: Lấy chi tiết đơn vị tính theo id](#23-lấy-chi-tiết-đơn-vị-tính-theo-id)
 -[2.4: Lấy tất cả đơn vị tính](#24-lấy-tất-cả-đơn-vị-tính)
 -[2.5: Xoá đơn vị tính theo id](#25-xoá-đơn-vị-tính-theo-id)
 -[2.6: Tìm kiếm đơn vị tính](#26-tìm-kiếm-đơn-vị-tính)
 -[2.7: Xoá danh sách đơn vị tính](#27-xoá-danh-sách-đơn-vị-tính)
 
 ### 2.1 Tạo một đơn vị tính
- Router: **/api/unit/add**
- Function: **create_unit()**
- Method: **POST**
- Paremeter:
- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Unit object](#data-structure-unit-object) |

- Mô tả nhập dữ liệu:
{
     "Name": "(Tên đơn vi tính)",
     "IdCategory":  "(Danh sách Id danh mục)",
     "Description": "(Mô tả )"

}
- Dữ liệu trả về:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Unit object](#data-structure-unit-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.2 Cập nhật một đơn vị tính 

- Router: **/api/unit/update/:id**
- Function: **update_unit**
- Method: **POST**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Unit |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Unit object](#data-structure-unit-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Unit object](#data-structure-unit-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.3: Lấy chi tiết đơn vị tính theo id

- Router: **/api/unit/get/:id**
- Function: **get_unit**
- Method: **GET**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Unit |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Unit object](#data-structure-unit-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Unit object](#data-structure-unit-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.4: Lấy tất cả đơn vị tính

- Router: **/api/unit**
- Function: **get_units**
- Method: **GET**
- header:

    |  Tên Trường     | Kiểu dữ liệu     |              Mô tả          |  
    |:--------------: |:---------------: |:--------------------------: |  
    | Authorization   |    string        |        Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                   |  
    |:----------:  |:------------:    |:---------------------------------------------: |  
    |   data       |    object        |  [ Unit object](#data-structure-unit-object)   |  
    |   status     |    boolean       |  true - Thành công; false - Có lỗi             |  
    |   message    |    string        |  Tin nhắn trả về                               |  

### 2.5: Xoá đơn vị tính theo id

- Router: **/api/unit/delete/:id**
- Function: **remove_unit**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Unit |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Unit object](#data-structure-unit-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Unit object](#data-structure-unit-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.6: Tìm kiếm đơn vị tính

- Router: **/api/unit/search**
- Function: **search_unit**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |
- Paremeter:
   | Tên Trường | Kiểu dữ liệu |    mặc định    |    Mô tả                |  
   |:----------:|:------------:|:-------------: |:----------------------: |  
   |    Name    |   string     |    null        | Từ khóa tìm kiếm        |
   |    page    |   number     |    1           | trang cần xem           |
   |    limit   |   number     |    20          | Số lượng kết quả trả về |
   |    sort    |   object     | {"Date": desc} | Trường sắp xếp          |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |    Danh sách đơn vị tính tìm thấy |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.7: Xoá danh sách đơn vị tính

- Router: **/api/unit/list/delete**
- Function: **remove_list_unit**
- Method: **POST**
header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |         Mô tả         |
  | :--------: | :----------: | :-------------------: |
  |   listId   |    array     | Danh sách id của Unit |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |   Số lượng unit xóa thành công    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |