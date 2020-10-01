# I. SubCategrou service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: SubCategrou
##### Data structure (SubCategrou object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| IdCategory               | ObjectId  |  |  | ID Categroy |
|2| Title              | String    |   | required | Tiêu đề của danh mục con con |
|3| Name            | String  |  |  | Tên danh mục con con | 

## 2. Service info  
### Thông tin SubCategrou * Tên SubCategrou: **SubCategrou**  
* Source code: ./Controller/SubcategoryController.js  
* Danh sách routers  
   * [2.1: Thêm danh mục con mới](#11--thêm-danh-mục-con-mới)  
   * [2.2: Cập nhật danh mục con ](#12--cập-nhật-danh-mục-con )  
   * [2.3: Xóa danh mục con ](#13--xóa-danh-mục-con)
   * [2.4: Lấy chi tiết danh mục con của người dùng ](#16--lấy-chi-tiết-danh-mục-con-của-người-dùng)
 
  
  ### 2.1  Thêm danh mục con mới  
 - Router: **/api/SubCategrou**  
 - Function: **createSubCategory()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ SubCategrou object](#data-structure-SubCategrou-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ SubCategrou object](#data-structure-SubCategrou-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
  ### 2.2  Cập nhật danh mục con
 - Router: **/api/update/:id**  
 - Function: **updateSubCategory()**  
 - Method: **POST**
 - Paremeter: 
   
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của SubCategrou      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ SubCategrou object](#data-structure-SubCategrou-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ SubCategrou object](#data-structure-SubCategrou-object)    |  
    |   status     |    boolean         | true - thành công, false - thất bại                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
    
### 2.3  Xóa danh mục con   
 - Router: **/api/delete/:id**  
 - Function: **deleteSubCategory()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của SubCategrou      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ SubCategrou object](#data-structure-SubCategrou-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ SubCategrou object](#data-structure-SubCategrou-object)  + token    |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.4  Lấy chi tiết danh muc của người dùng  
 - Router: **/api/SubCategrou**  
 - Function: **get_Subcategory()**  
 - Method: **GET**
 - Paremeter:
    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string |          id của SubCategrou      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Chi tiết SubCategrou   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
