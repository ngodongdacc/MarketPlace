# I. Procuct service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Product
##### Data structure (Product object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của sản phẩm |
|2| Name              | String    |           | required | Tên của sản phẩm |
|3| IdUser            | ObjectId  |           | required | Id của tài khoản đăng sản phẩm lên |
|4| IdShop            | ObjectId  |           | required | Id của Shop đăng sản phẩm  |
|5| IdCategory        | ObjectId  |           | required | Id của danh mục  |
|6| IdCategorySub     | ObjectId  |           | required |Id của danh mục con  |
|7| Image             | String    |           | required | Id của sản phẩm |
|8| Quantity          | Number    |           |            |  |
|9| Price             | Number    |           | required | Giá bán  |
|10| CodeProduct       | String    |           | required | Mã sản phẩm |
|11| ListedPrice       | Number    |           | required | Giá niêm yết  |
|12| Number            | Number    |     1     |           | số lượng  sẩn phẩm  |
|13| NumberSell        | Number    |     0     |           | số lượng  bán được  |
|14| View              | Number    |     0     |           | số lượng  lượt xem   |
|15| ExpirationDateSale| Date      |    null   |           | ngày hết hạn sale    |
|16| StatusSale        | Boolean   |    false  |           | Trạng thái salse     |
|17| Sale              | Number    |     0     |           | giảm giá (%) default: 0 , max:100, min:0      |
|18| ImageList         | Array     |    []     |           | Danh sách ảnh      |
|19| OutstandingFeatures          | String      |    null     |           | Đặc điểm nổi bật (ít 3 đặc điểm)       |
|20| DetailedAttributes           | String      |    null     |           | Chi tiết thuộc tính        |
|21| SearchAttributes             | String      |    null     |           | thuộc tính tìm kiếm        |
|22| PointEvaluation              | Number       |    0     |           | Điểm đánh giá         |
|23| NumberEvaluation             | Number       |    0     |           | Số lượng đánh giá         |
|24| DetailedDescription          | String      |    null     |           | Mô tả chi tiết sản phẩm         |
|25| PackingLength              | Number       |    null     |    required       | Chiều dài đóng gói         |
|26| PackingWidth               | Number       |    null     |      required     | Chiều rộng đóng gói         |
|27| Weight                     | Number      |    null     |       required    | trọng lượng       |
|28| CategoryGoods              | String      |    null     |           | danh mục hàng hóa nguy hiểm         |
|29| IMEI                       | Boolean       |    false     |           | quản lý bằng IMEI (default: false)         |
|30| Serial                     | Boolean       |    false     |           | Quản lý bằng serial (default: false)         |
|31| Model                      | String         |    null     |           |Dòng sản phẩm          |
|32| Unit                       | String        |    null     |           | Đơn vị tính          |
|33| Date                       | Date        |    Now     |           | ngày tạo          |
|34| DateUpdate                 | Date       |    now     |           | ngày cập nhật          |
|35| DeliveryAddress            | String        |    null     |           | địa chỉ giao hàng         |
|36| Material                   | String        |    null     |           | Chất liệu        |
|37| Size                       | String        |    null     |           | Kích cỡ         |
|38| Color                      | String        |    null     |           | Màu họa tiết        |
|39| StorageInstructions        | String        |    null     |           | Hướng dẫn bảo quản      |
|40| LaundryInstructions        | String        |    null     |           | Hướng dẫn bảo quản/giặt ủi       |
|41| SampleSize                 | String        |    null     |           | kích cỡ mẫu         |
|42| ModelNumber                | String        |    null     |           | Số đo người mẫu         |
|43| TypeSell                   | String        |    null     |           | Dạng bán (lẻ combo bộ)        |
|44| Warranty                   | Boolean         |    false     |           | Bảo hành         |
|45| PermanentWarranty          | Boolean        |    false     |           | Bảo hành vĩnh viển         |
|46| WarrantyForm               | String        |    null     |       | Hình thức bảo hành ([hóa đơn, phiếu bảo hành, team bảo hành, điện tử])     |
|47| WarrantySevice             | String        |    null     |     |Dịch vụ bảo hành ([bảo hành chính hãng, bảo hành thông qua sàn điện tử])|
|48| WarrantyTime                | Number        |    null     |           | Thời gian bảo hành     |
|49| WarrantyUnit                | Number        |    null     |           | Đơn vị bảo hành ([tháng, năm])        |
|50| OperationModel             | String        |    null     |           | Mô hình vận hành (kho hàng qt-data)         |
|51| TradeDocument              | Array         |    null     |           | Tài liệu thương hiệu        |
|52| IdTrademark                | ObjectId         |    null     |           | Thương hiệu         |
|53| Status                     | Number         |    0     |           | trạng thái [chờ duyệt, đã duyệt]       |
|54| StatusNew                  | Boolean         |    null     |           | Sản phẩm mới       |
|55| Customs                    | Array         |    null     |           | mở rộng (size, màu)         |

## 2. Service info  
### Thông tin service * Tên service: **Product**  
* Source code: ./Controller/productController.js  
* Danh sách routers  
   * [2.1: Thêm sản phẩm mới](#11--thêm-sản-phẩm-mới)  
   * [2.2: Cập nhật sản phẩm ](#12--cập-nhật-sản-phẩm )  
   * [2.3: Xóa sản phẩm ](#13--xóa-sản-phẩm)
   * [2.4: Xóa danh sách sản phẩm](#14--xóa-danh-sách-sản-phẩm)
   * [2.5: Tìm kiếm sản phẩm của người dùng ](#15--tìm-kiếm-sản-phẩm-của-người-dùng)
   * [2.6: Lấy chi tiết sản phẩm của người dùng ](#16--lấy-chi-tiết-sản-phẩm-của-người-dùng)
   * [2.7: Lấy chi tiết sản phẩm của shop ](#17--lấy-chi-tiết-sản-phẩm-của-shop)
   * [2.8: Tìm kiếm sản phẩm của shop ](#17--tìm-kiếm-sản-phẩm-của-shop)
  
### 2.1  Thêm sản phẩm mới  
 - Router: **/api/product**  
 - Function: **create_product()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Product object](#data-structure-product-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Product object](#data-structure-product-object)|  
    |   status     |    boolean         | true: thành công, false: thất bại                          |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 2.2  Cập nhật sản phẩm  
 - Router: **/api/product/update/:id**  
 - Function: **update_product()**  
 - Method: **POST**
 - Paremeter: 
   
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của product      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Product object](#data-structure-product-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Product object](#data-structure-product-object)    |  
    |   status     |    boolean         | true - thành công, false - thất bại                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
  
### 1.3  Xóa sản phẩm  
 - Router: **/api/product/delete/:id**  
 - Function: **remove_product()**  
 - Method: **POST**
 - Paremeter: 
        
    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    id     |    String  |         id của product      |

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Product object](#data-structure-product-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Product object](#data-structure-product-object)  + token    |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 1.4  Xóa danh sách sản phẩm  
 - Router: **/api/product/list/delete**  
 - Function: **remove_list_product()**  
 - Method: **POST**
 - Paremeter: 

 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    listIdProduct     |    array |         Danh sách id của product      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Số lượng prouct xóa thành công   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 1.5  Tìm kiếm sản phẩm của người dùng
 - Router: **/api/product/search/query**  
 - Function: **search_product()**  
 - Method: **GET**
 - Description: Từ khóa tìm kiếm sẽ được lưu vào từ khóa tìm kiếm
 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | `{"Date": -1}` |         Trường sắp xếp      |
    |    idCategory     |    string | null |         Id của danh mục      |
    |    idCategorySub     |    string | null |         Id của danh mục con      |
    |    minPrice     |    number | 0 |         khoảng giá thấp nhất      |
    |    maxPrice     |    number | 100.000.000.000 |         khoảng giá cao nhất      |
    |    idUser     |    ObjectId | null |         Nếu truyền vào idUser thì từ khóa sẽ được lưu vào lịch sử tìm kiếm của user    |
    |    statusSale     |    Boolean | null |         Tìm kiếm sản phẩm sale    |
    |    statusNew     |    Boolean | null |         Tìm kiếm sản phẩm mới    |
- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 1.6  Lấy chi tiết sản phẩm của người dùng  
 - Router: **/api/product**  
 - Function: **get_product()**  
 - Method: **GET**
 - Paremeter:
    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    id     |    string |          id của product      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Chi tiết product   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  



### 1.7  Lấy chi tiết sản phẩm của shop  
 - Router: **/**  
 - Function: **()**  
 - Method: **GET**
 - Paremeter: 

### 1.8  Tìm kiếm sản phẩm của shop  
 - Router: **/api/product/shop/search**  
 - Function: **search_product_shop()**  
 - Method: **GET**
 - Description: Từ khóa tìm kiếm sẽ được lưu vào từ khóa tìm kiếm
 - header:

    | Tên Trường  | Kiểu dữ liệu     |              Mô tả                  |  
    |:----------:  |:------------:   |:--------------------------------:    |  
    |    Authorization     |    string |          Token đăng nhập      |

 - Paremeter: 
    | Tên Trường  | Kiểu dữ liệu     | mặc định |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    search     |    string | null |         Từ khóa tìm kiếm      |
    |    page     |    number | 1 |         trang cần xem     |
    |    limit     |    number | 20 |         Số lượng kết quả trả về      |
    |    sort     |    object | `{"Date": -1}` |         Trường sắp xếp      |
    |    idCategory     |    string | null |         Id của danh mục      |
    |    idCategorySub     |    string | null |         Id của danh mục con      |
    |    minPrice     |    number | 0 |         khoảng giá thấp nhất      |
    |    maxPrice     |    number | 100.000.000.000 |         khoảng giá cao nhất      |
    |    idUser     |    ObjectId | null |         Nếu truyền vào idUser thì từ khóa sẽ được lưu vào lịch sử tìm kiếm của user    |
    

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        |  Danh sách sản phấm tìm thấy   |  
    |   status     |    boolean         | true - Thành công; false - Có lỗi                           |  
    |   message    |    string        | Tin nhắn trả về                                      |  
