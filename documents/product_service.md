# I. Procuct service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Product
##### Data structure (Product object)

|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
| _id               | ObjectId  | random | required | Id của sản phẩm |
| Name              | String    |           | required | Tên của sản phẩm |
| IdUser            | ObjectId  |           | required | Id của tài khoản đăng sản phẩm lên |
| IdShop            | ObjectId  |           | required | Id của Shop đăng sản phẩm  |
| IdCategory        | ObjectId  |           | required | Id của danh mục  |
| IdCategorySub     | ObjectId  |           | required |Id của danh mục con  |
| Image             | String    |           | required | Id của sản phẩm |
| Quantity          | Number    |           |            |  |
| Price             | Number    |           | required | Giá bán  |
| CodeProduct       | String    |           | required | Mã sản phẩm |
| ListedPrice       | Number    |           | required | Giá niêm yết  |
| Number            | Number    |     1     |           | số lượng  sẩn phẩm  |
| NumberSell        | Number    |     0     |           | số lượng  bán được  |
| View              | Number    |     0     |           | số lượng  lượt xem   |
| ExpirationDateSale| Date      |    null   |           | ngày hết hạn sale    |
| StatusSale        | Boolean   |    false  |           | Trạng thái salse     |
| Sale              | Number    |     0     |           | giảm giá (%) default: 0 , max:100, min:0      |
| ImageList         | Array     |    []     |           | Danh sách ảnh      |