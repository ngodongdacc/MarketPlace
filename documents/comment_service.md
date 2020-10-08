# I. Comment service

## 1. Database info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: Comments

##### Data structure (Comment object)

| Stt | Tên trường | Kiểu dữ liệu | Giá mặc định | Bắt buộc |           Mô tả           |
| :-: | :--------: | :----------: | :----------: | :------: | :-----------------------: |
|  1  |    \_id    |   ObjectId   |    random    | required |      Id của comment       |
|  2  |  Content   |    String    |              | required | Tên của nội dung comment  |
|  3  |   Reply    |    Array     |      []      |          | Danh dách comment trả lời |
|  4  | NewDateAt  |     Date     |  Date.now()  | required |         Ngày tạo          |
|  5  |  UpDateAt  |     Date     |  Date.now()  |          |       Ngày cập nhật       |
|  6  |   IdUser   |   ObjectId   |              | required |   Id tài khoản comment    |
|  7  | IdProduct  |   ObjectId   |              | required |    Id sản phẩm comment    |

## 2. Service info

### Thông tin service \* Tên service: **Comment**

- Source code: ./Controller/CommentController.js
- Danh sách routers
  - [2.1: Thêm comment mới](#21-Thêm-comment-mới)
  - [2.2: Cập nhật comment Parent](#22-cập-nhật-comment-parent)
  - [2.3: Lấy chi tiết Comment](#23-Lấy-chi-tiết-Comment)
  - [2.4: Xóa Comment Parent](#24-xóa-comment-parent)
  - [2.5: Trả lời Comment ](#25-Trả-lời-Comment)
  - [2.6: Lấy danh sách Comment của sản phẩm ](#26-Lấy-danh-sách-Comment-của-sản-phẩm)
  - [2.7: Cập nhật comment Super](#27-Cập-nhật-comment-Super)
  - [2.8: Xóa Comment Super](#28-Xóa-Comment-Super)

### 2.1 Thêm comment mới

- Router: **/api/comment/comment**
- Function: **postComment()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |          Mô tả           |
  | :--------: | :----------: | :----------------------: |
  |  Content   |    String    | Tên của nội dung comment |
  | IdProduct  |   ObjectId   |   Id sản phẩm comment    |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

### 2.2 Cập nhật comment Parent

- Router: **/api/comment/update-commentp**
- Function: **updateComment_Parent()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |          Mô tả           |
  | :--------: | :----------: | :----------------------: |
  |  Content   |    String    | Tên của nội dung comment |
  | IdProduct  |   ObjectId   |   Id sản phẩm comment    |
  | IdComment  |   ObjectId   | Id comment của sản phẩm  |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

### 2.3 Lấy chi tiết Comment

- Router: **/api/comment/comment-details**
- Function: **get_Comment_Detail()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |          Mô tả          |
  | :--------: | :----------: | :---------------------: |
  | IdProduct  |   ObjectId   |   Id sản phẩm comment   |
  | IdComment  |   ObjectId   | Id comment của sản phẩm |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

### 2.4 Xóa Comment Parent

- Router: **/api/comment/delete-commentp**
- Function: **deleteComment_Parent()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:
  | Tên Trường | Kiểu dữ liệu | Mô tả |
  | :--------: | :----------: | :----------------------: |
  | IdProduct | ObjectId | Id sản phẩm comment |
  | IdComment | ObjectId | Id comment của sản phẩm |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

### 2.5 Trả lời Comment

- Router: **/api/comment/recomment**
- Function: **searchShop()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  | Tên Trường | Kiểu dữ liệu |            Mô tả            |
  | :--------: | :----------: | :-------------------------: |
  |  Content   |    String    | Tên của nội dung re-comment |
  | IdComment  |   ObjectId   |   Id comment của sản phẩm   |
  | IdProduct  |   ObjectId   |     Id sản phẩm comment     |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

  ### 2.6 Lấy danh sách Comment của sản phẩm

- Router: **/api/comment/comment-product**
- Function: **searchShop()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Paremeter:

  | Tên Trường | Kiểu dữ liệu |                  Mô tả                  |
  | :--------: | :----------: | :-------------------------------------: |
  | IdProduct  |   ObjectId   |           Id sản phẩm comment           |
  |   limit    |    String    | Giới hạn bao nhiêu commnet trên 1 trang |
  |    page    |   ObjectId   |      Số trang comment của sản phẩm      |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

  ### 2.7 Cập nhật comment Super

- Router: **/api/comment/update-comments**
- Function: **updateComment_Super()**
- Method: **POST**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:

  |   Tên Trường    | Kiểu dữ liệu |             Mô tả              |
  | :-------------: | :----------: | :----------------------------: |
  |     Content     |    String    |    Tên của nội dung comment    |
  |    IdProduct    |   ObjectId   |      Id sản phẩm comment       |
  |    IdComment    |   ObjectId   | Id comment parent của sản phẩm |
  | IdCommentSupper |   ObjectId   | Id comment reply của sản phẩm  |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |

### 2.8 Xóa Comment Super

- Router: **/api/comment/delete-comments**
- Function: **deleteComment_Super()**
- Method: **GET**
- header:

  |  Tên Trường   | Kiểu dữ liệu |      Mô tả      |
  | :-----------: | :----------: | :-------------: |
  | Authorization |    string    | Token đăng nhập |

- Body:
  | Tên Trường | Kiểu dữ liệu | Mô tả |
  | :--------: | :----------: | :----------------------: |
  | IdProduct | ObjectId | Id sản phẩm comment |
  | IdCommentParent | ObjectId | Id comment parent của sản phẩm |
  | IdCommentSup | ObjectId | Id comment reply của sản phẩm |
  
- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                       Mô tả                       |
  | :--------: | :----------: | :-----------------------------------------------: |
  |    data    |    object    | [ Comment object](#data-structure-comment-object) |
  |   status   |   boolean    |         true: thành công, false: thất bại         |
  |  message   |    string    |                  Tin nhắn trả về                  |
