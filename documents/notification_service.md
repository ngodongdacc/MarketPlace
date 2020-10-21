# I. Notification service

## 1. Dtiatabase info

##### Database type: Mongodb

##### Database Name: marketplace

##### Conllection type: notifications

##### Data structure (Notification object)

| Stt | Tên trường | Kiểu dữ liệu | Giá mặc định | Bắt buộc |                    Mô tả                    |
| :-: | :--------: | :----------: | :----------: | :------: | :-----------------------------------------: |
|  1  |    \_id    |   ObjectId   |    random    | required |              Id của thông báo               |
|  2  |  Content   |    String    |              | required |           Nội dung của thông báo            |
|  3  |    URL     |    String    |              |          |      Đường dẫn của nội dung thông báo       |
|  4  | NewDateAt  |     Date     |  Date.now()  | required |                  Ngày tạo                   |
|  5  |   IdUser   |   ObjectId   |              | required |           Id tài khoản thông báo            |
|  6  |   Status   |   Boolean    |              | required | Trạng thái của thông báo( đã xem, chưa xem) |

## 2. Service info

### Thông tin service \* Tên service: **Notification**

- Source code: ./Socket/notification_socket.js
- Danh sách routers
  - [2.1: Thêm thông báo mới](#21-Thêm-comment-mới)
  - [2.2: Cập nhật thông báo](#22-cập-nhật-comment-parent)
  - [2.3: Xóa thông báo](#23-Lấy-chi-tiết-Comment)
  - [2.4: Lấy danh sách thông báo của người dùng](#24-xóa-comment-parent)
  - [2.5: Lấy chi tiết thông báo ](#25-Trả-lời-Comment)
  - [2.6: Tìm kiếm thông báo ](#26-Lấy-danh-sách-Comment-của-sản-phẩm)

### 2.1 Thêm thông báo mới

- Event: **input**
- Function: **createNotification()**
- data truyền vào:

  | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |
  |  Content   |    String    | Nội dung của thông báo |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       |

### 2.2 Cập nhật thông báo

- Event: **update**
- Function: **updateNotification()**
- data truyền vào:

  | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |
  |     id     |    String    |      Id thông báo      |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       |

### 2.3 Xóa thông báo

- Event: **delete**
- Function: **DeleteByIdNotification()**
- data truyền vào:

 | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |
  |     id     |    String    |      Id thông báo      |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       |

### 2.4 Lấy danh sách thông báo của người dùng

- Event: **id-user**
- Function: **findByIdNotification()**
- data truyền vào:

  | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       |
<!-- 
### 2.5 Lấy chi tiết thông báo

- Event: **id-user**
- Function: **NotificationService.findByIdNotification()**
- data truyền vào:

  | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       |

  ### 2.6 Tìm kiếm thông báo

- Event: **id-user**
- Function: **NotificationService.findByIdNotification()**
- data truyền vào:

  | Tên Trường | Kiểu dữ liệu |         Mô tả          |
  | :--------: | :----------: | :--------------------: |
  |   IdUser   |   ObjectId   | Id tài khoản thông báo |

- Dữ liệu trả về

  | Tên Trường | Kiểu dữ liệu |                            Mô tả                            |
  | :--------: | :----------: | :---------------------------------------------------------: |
  |    data    |    object    | [Notification object](#data-structure-notifications-object) |
  |   status   |   boolean    |              true: thành công, false: thất bại              |
  |  message   |    string    |                       Tin nhắn trả về                       | -->
