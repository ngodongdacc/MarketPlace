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
 