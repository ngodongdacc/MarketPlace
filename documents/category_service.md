# I. Category service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Category
##### Data structure (Category object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| Icon               | String  |  | required | Đường dẫn từ Icon |
|2| Title              | String    |   | required | Tiêu đề của danh mục |
|3| Description            | String  |  |  | Mô tả danh muc | 

## 2. Service info  
### Thông tin category * Tên category: **Category**  
* Source code: ./Controller/categoryController.js  
* Danh sách routers  
   * [2.1: Thêm danh mục mới](#11--thêm-danh-mục-mới)  
   * [2.2: Cập nhật danh mục ](#12--cập-nhật-danh-mục )  
   * [2.3: Xóa danh mục ](#13--xóa-danh-mục)
   * [2.4: Lấy chi tiết danh mục của người dùng ](#16--lấy-chi-tiết-danh-mục-của-người-dùng)
   * [2.5: Tìm kiếm danh mục ](#15--tìm-kiếm-danh-mục)
   * [2.7: Lấy chi tiết danh mục của shop ](#17--lấy-chi-tiết-danh-mục-của-shop)
  
  ### 2.1  Thêm danh mục mới  
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
    |   data      |    object        | [ Category object](#data-structure-category-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
  ### 2.2  Cập nhật danh mục
 - Router: **/api/update/:id**  
 - Function: **updateCategory()**  
 - Method: **POST**
 - Paremeter: 
   
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của category      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Category object](#data-structure-category-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Category object](#data-structure-category-object)    |  
    |   status     |    boolean         | true - thành công, false - thất bại                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
    
### 2.3  Xóa danh mục   
 - Router: **/api/delete/:id**  
 - Function: **deleteCategory()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của Category      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Category object](#data-structure-Category-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Category object](#data-structure-Category-object)  + token    |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.4  Lấy chi tiết danh muc của người dùng  
 - Router: **/api/category**  
 - Function: **get_category()**  
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
    |   message    |    string        | Tin nhắn trả về                                      |  

### 1.5  Tìm kiếm danh muc   
 - Router: **/api/category**  
 - Function: **searchCategory()**  
 - Method: **GET**
 - Description: Từ khóa tìm kiếm sẽ được lưu vào từ khóa tìm kiếm
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | `{"Date": -1}` |         Trường sắp xếp      |
    |    idCategory     |    string | null |         Id của danh mục      |  |


- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
