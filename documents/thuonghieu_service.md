# I. Unit service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: Trandemark

##### Data structure (Trandemark object)

| Stt |    Tên trường     | Kiểu dữ liệu | Giá mặc định | Bắt buộc |                  Mô tả                  |
| :-: | :---------------: | :----------: | :----------: | :------: | :-------------------------------------: |
|  1  |       _id         |   ObjectId   |    random    | required |   Id của đơn vị tính                    |
|  2  |       Name        |   String     |              | required |   Tên đơn vị tính                       |
|  3  |       Country     |   String     |              |          |   Tên quốc gia                          |
|  4  |       IdCategory  |   Array      |              |          |   Danh sách Id danh mục                 |   
|  5  |       IdCategorySub |   Array    |              |          |   Danh sách Id danh mục con     |            
|  6  |       Description |   String     |              |          |             Mô tả                       |


## 2. Service info

### Thông tin service \* Tên service: **Unit**

- Source code:../Controllers/customs_product/trademark_controller.js
- Danh sách routers
 -[2.1 Tạo mới thương hiệu](#21-tạo-mơi-thương-hiệu)
 -[2.2 Cập nhật thương hiệu](#22-cập-nhật-thương-hiệu)
 -[2.3 Lấy chi tiết thương hiệu theo id](#23-lấy-chi-tiết-thương-hiệu-theo-id)
 -[2.4 Lấy tất cả thương hiệu](#24-lấy-tất-cả-đơn-thương-hiệu)
 -[2.5 Xóa thương hiệu theo id](#25-xoá-thương-hiệu-theo-id)
 -[2.6 Tìm kiếm thương hiệu](#26-tìm-kiếm-thương-hiệu)
 -[2.7 Xóa danh sách thương hiệu](#27-xoá-danh-sách-thương-hiệu)
 -[2.8 Lấy thương hiệu theo danh mục](#28-lấy-thương-hiệu-theo-danh-mục)
 
 ### 2.1 Tạo mới thương hiệu
- Router: **/api/trandemark/add**
- Function: **create_trandemark()**
- Method: **POST**
- Paremeter:
- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Trandemark object](#data-structure-trandemark-object) |

- Mô tả nhập dữ liệu:
{
     "Name": "(Tên đơn vi tính)",
     "Country":"(Tên của thương hiệu),
     "IdCategory":  "(Danh sách Id danh mục cha)",
     "IdCategorySub":"(Danh sách Id danh mục con)",
     "Description": "(Mô tả )"

}
- Dữ liệu trả về:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Trandemark object](#data-structure-trandemark-object) |
  |   status   |   boolean    |      true: thành công, false: thất bại      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.2 Cập nhật thương hiệu

- Router: **/api/trandemark/update/:id**
- Function: **update_trandemark**
- Method: **POST**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Trandemark |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Trandemark object](#data-structure-trandemark-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Trandemark object](#data-structure-trandemark-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.3 Lấy chi tiết thương hiệu theo id

- Router: **/api/trandemark/get/:id**
- Function: **get_trandemark**
- Method: **GET**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Trandemark |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Trandemark object](#data-structure-trandemark-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Trandemark object](#data-structure-trandemark-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.4 Lấy tất cả thương hiệu

- Router: **/api/trandemark**
- Function: **get_trandemarks**
- Method: **GET**
- header:

    |  Tên Trường     | Kiểu dữ liệu     |              Mô tả          |  
    |:--------------: |:---------------: |:--------------------------: |  
    | Authorization   |    string        |        Token đăng nhập      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                   |  
    |:----------:  |:------------:    |:---------------------------------------------: |  
    |   data       |    object        |  [ Trandemark object](#data-structure-trandemark-object)   |  
    |   status     |    boolean       |  true - Thành công; false - Có lỗi             |  
    |   message    |    string        |  Tin nhắn trả về                               |  

### 2.5 Xóa thương hiệu theo id

- Router: **/api/trandemark/delete/:id**
- Function: **remove_trandemark**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của Trandemark |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Trandemark object](#data-structure-trandemark-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Trandemark object](#data-structure-trandemark-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |

### 2.6 Tìm kiếm thương hiệu

- Router: **/api/trandemark/search**
- Function: **search_trandemark**
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
  |    data    |    object    |    Danh sách thương hiệu tính tìm thấy |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |

### 2.7 Xóa danh sách thương hiệu

- Router: **/api/trandemark/list/delete**
- Function: **remove_list_trandemark**
- Method: **POST**
header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |         Mô tả         |
  | :--------: | :----------: | :-------------------: |
  |   listId   |    array     | Danh sách id của Trandemark |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |               Mô tả               |
  | :--------: | :----------: | :-------------------------------: |
  |    data    |    object    |   Số lượng trandeamrk xóa thành công    |
  |   status   |   boolean    | true - Thành công; false - Có lỗi |
  |  message   |    string    |          Tin nhắn trả về          |
  ###  2.8 Lấy thương hiệu theo danh mục
- Router: **/api/trandemark/get/:IdCategorySub**
- Function: **get_trandemark_IdCategorySub**
- Method: **GET**
- Header: 

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |    Mô tả    |
  | :--------: | :----------: | :---------: |
  |     id     |    String    | id của IdCategorySub |

- Body:

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    body    |    object    | [ Trandemark object](#data-structure-trandemark-object) |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                    Mô tả                    |
  | :--------: | :----------: | :-----------------------------------------: |
  |    data    |    object    | [ Trandemark object](#data-structure-trandemark-object) |
  |   status   |   boolean    |      true - Thành công; false - Có lỗi      |
  |  message   |    string    |               Tin nhắn trả về               |
 