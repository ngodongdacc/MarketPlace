# I. Procuct service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Product
##### Data structure (Product object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|1|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  ||2|  
|3| _id               | ObjectId  | random | required | Id của sản phẩm |
|4| Name              | String    |           | required | Tên của sản phẩm |
|5| IdUser            | ObjectId  |           | required | Id của tài khoản đăng sản phẩm lên |
|6| IdShop            | ObjectId  |           | required | Id của Shop đăng sản phẩm  |
|7| IdCategory        | ObjectId  |           | required | Id của danh mục  |
|8| IdCategorySub     | ObjectId  |           | required |Id của danh mục con  |
|9| Image             | String    |           | required | Id của sản phẩm |
|10| Quantity          | Number    |           |            |  |
|11| Price             | Number    |           | required | Giá bán  |
|12| CodeProduct       | String    |           | required | Mã sản phẩm |
|13| ListedPrice       | Number    |           | required | Giá niêm yết  |
|14| Number            | Number    |     1     |           | số lượng  sẩn phẩm  |
|15| NumberSell        | Number    |     0     |           | số lượng  bán được  |
|16| View              | Number    |     0     |           | số lượng  lượt xem   |
|17| ExpirationDateSale| Date      |    null   |           | ngày hết hạn sale    |
|18| StatusSale        | Boolean   |    false  |           | Trạng thái salse     |
|19| Sale              | Number    |     0     |           | giảm giá (%) default: 0 , max:100, min:0      |
|20| ImageList         | Array     |    []     |           | Danh sách ảnh      |
|21| OutstandingFeatures          | String      |    null     |           | Đặc điểm nổi bật (ít 3 đặc điểm)       |
|22| DetailedAttributes           | String      |    null     |           | Chi tiết thuộc tính        |
|23| SearchAttributes             | String      |    null     |           | thuộc tính tìm kiếm        |
|24| PointEvaluation              | Number       |    0     |           | Điểm đánh giá         |
|25| NumberEvaluation             | Number       |    0     |           | Số lượng đánh giá         |
|26| DetailedDescription          | String      |    null     |           | Mô tả chi tiết sản phẩm         |
|27| PackingLength              | Number       |    null     |    required       | Chiều dài đóng gói         |
|28| PackingWidth               | Number       |    null     |      required     | Chiều rộng đóng gói         |
|29| Weight                     | Number      |    null     |       required    | trọng lượng       |
|30| CategoryGoods              | String      |    null     |           | danh mục hàng hóa nguy hiểm         |
|31| IMEI                       | Boolean       |    false     |           | quản lý bằng IMEI (default: false)         |
|32| Serial                     | Boolean       |    false     |           | Quản lý bằng serial (default: false)         |
|33| Model                      | String         |    null     |           |Dòng sản phẩm          |
|34| Unit                       | String        |    null     |           | Đơn vị tính          |
|35| Date                       | Date        |    Now     |           | ngày tạo          |
|36| DateUpdate                 | Date       |    Date.now     |           | ngày cập nhật          |
|37| DeliveryAddress            | String        |    null     |           | địa chỉ giao hàng         |
|38| Material                   | String        |    null     |           | Chất liệu        |
|39| Size                       | String        |    null     |           | Kích cỡ         |
|40| Color                      | String        |    null     |           | Màu họa tiết        |
|41| StorageInstructions        | String        |    null     |           | Hướng dẫn bảo quản      |
|42| LaundryInstructions        | String        |    null     |           | Hướng dẫn bảo quản/giặt ủi       |
|43| SampleSize                 | String        |    null     |           | kích cỡ mẫu         |
|44| ModelNumber                | String        |    null     |           | Số đo người mẫu         |
|45| TypeSell                   | String        |    null     |           | Dạng bán (lẻ combo bộ)        |
|46| Warranty                   | Boolean         |    false     |           | Bảo hành         |
|47| PermanentWarranty          | Boolean        |    false     |           | Bảo hành vĩnh viển         |
|48| WarrantyForm               | String        |    null     |       | Hình thức bảo hành ([hóa đơn, phiếu bảo hành, team bảo hành, điện tử])     |
|49| WarrantySevice             | String        |    null     |     |Dịch vụ bảo hành ([bảo hành chính hãng, bảo hành thông qua sàn điện tử])|
|50| WarrantyTime                | Number        |    null     |           | Thời gian bảo hành     |
|51| WarrantyUnit                | Number        |    null     |           | Đơn vị bảo hành ([tháng, năm])        |
|52| OperationModel             | String        |    null     |           | Mô hình vận hành (kho hàng qt-data)         |
|53| TradeDocument              | Array         |    null     |           | Tài liệu thương hiệu        |
|54| IdTrademark                | ObjectId         |    null     |           | Thương hiệu         |
|55| Status                     | Number         |    0     |           | trạng thái [chờ duyệt, đã duyệt]       |
|56| StatusNew                  | Boolean         |    null     |           | Sản phẩm mới       |
|57| Customs                    | Array         |    null     |           | mở rộng (size, màu)         |