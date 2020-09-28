# I category service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Category
##### Data structure (Category object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| Icon              | String  |  |  | Icon người dùng |
|2| Title               | String  |  | required | Tiêu đề |
|3| Description               | String  |  |  | Mô tả |


## 2. Service info  
### Thông tin service * Tên service: **Category**  
* Source code: ./Controller/CategoryController.js  
* Danh sách routers  
   * [2.1: Tạo mới 1 danh mục](#21--Tạo-mới-1-danh-muc)  
   * [2.2: Câp nhập 1 danh mục](#22--Cập-nhập-1-danh-muc)  
   * [2.3: Xoá 1 danh mục](#2--Xoá-1-danh-muc)
   * [2.4: Lấy ra danh sách danh mục theo ID](#2--Lấy-ra-danh-sách-đơn-hàng-theo-ID)  
   * [2.5: Tìm kiếm danh mục](#2--Tìm-kiếm-danh-muc)


### 2.1  Tạo mới 1 danh mục
- Router: **/api/category**  
 - Function: **createCategory()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Category object](#data-structure-category-object)      |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ category object](#data-structure-category-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.2 Câp nhập 1 danh mục
- Router: **/api/category/(id category cần update)**  
 - Function: **updateCategory()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ category object](#data-structure-category-object)      |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ category object](#data-structure-category-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về    
    
    
### 2.3 Xoá 1 danh mục
- Router: **/api/delete/:id**  
 - Function: **deletecategory()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của category      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ category object](#data-structure-product-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ category object](#data-structure-product-object)  + token    |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |                                    |  

### 2.4 Lấy ra danh sách danh mục theo ID
 - Router: **/api/get/(id category)**  
 - Function: **getCategory()**  
 - Method: **GET**
 - Paremeter:
   | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string |          id của category      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Chi tiết category   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả 
    về                                      |  
    



### 2.7 Tìm kiếm danh mucj
- Router: **/api/category/search**  
 - Function: **deleteListcategory()**  
 - Method: **POST**
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | {"Date": -1} |         Trường sắp xếp      |
    |    idCategory     |    string | null |         Id của danh mục      |
      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  