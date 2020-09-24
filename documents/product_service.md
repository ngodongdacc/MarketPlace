# I. Procuct service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Product
##### Data structure (Product object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  ||2|  
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
|34| DateUpdate                 | Date       |    Date.now     |           | ngày cập nhật          |
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
### 1. Thông tin service * Tên service: **Product**  
* Source code: ./Controller/productController.js  
* Danh sách routers  
   * [Thêm sản phẩm mới](#thêm-sản-phẩm-mới)  
   * [Cập nhật sản phẩm ](#cập-nhật-sản-phẩm )  
   * [Xóa sản phẩm ](#xóa-sản-phẩm)
   * [Xóa danh sách sản phẩm](#xóa-danh-sách-sản-phẩm)
   * [Tìm kiếm sản phẩm của shop ](#tìm-kiếm-sản-phẩm-của-shop)
   * [Lấy chi tiết sản phẩm của người dùng ](#lấy-chi-tiết-sản-phẩm-của-người-dùng)
   * [Lấy chi tiết sản phẩm của shop ](#lấy-chi-tiết-sản-phẩm-của-shop)
  
### 1.1  Thêm sản phẩm mới  
 - Router: **/api/product**  
 - Function: **create_product()**  
 - Method: **POST**
 - Paremeter: 