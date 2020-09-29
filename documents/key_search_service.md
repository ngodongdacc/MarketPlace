# I. KeySearch service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: keySearch
##### Data structure (keySearch object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của từ khóa tìm kiếm |
|2| Key               | String  |  | required | Từ khóa tìm kiếm |
|3| CountSearch               | Number  | null |  | Số lần tìm kiếm |
|4| ListIdUser               | Array  | [] |  | Danh sách tài khoản tìm kiếm {IdUser: id của tài khoản tìm kiếm, Count: số lần tìm kiếm}  |
|5| CreateAt               | Date  | now |  | Ngày tạo mới |
|6| UpdateAt               | DAte  | now | required | ngày cập nhật |
 
## 2. Service info  
### Thông tin service * Tên service: **User**  
* Source code: ./Controller/keySearchController.js  
* Danh sách routers  
   * [2.1: Thêm từ khóa tìm kiếm](#21--thêm-từ-khóa-tìm-kiếm)  
   * [2.2: Từ khóa tìm kiếm nhiều nhất](#22--từ-khóa-tìm-kiếm-nhiều-nhất)  
   * [2.3: Từ khóa người dùng tìm kiếm nhiều nhất](#23--từ-khóa-người-dùng-tìm-kiếm-nhiều-nhất)  


### 2.1  Thêm từ khóa tìm kiếm
- Từ khóa tìm kiếm sẽ được lưu vào khi tìm kiếm sản phẩm
- Link: https://github.com/ngodongdacc/MarketPlace/blob/master/documents/product_service.md#15--t%C3%ACm-ki%E1%BA%BFm-s%E1%BA%A3n-ph%E1%BA%A9m-c%E1%BB%A7a-shop

### 2.2  Từ khóa tìm kiếm nhiều nhất
 - Router: **/api/key-search/count**  
 - Function: **count_search()**  
 - Method: **GET**
 - Paremeter: 
    
     | Tên Trường  | Kiểu dữ liệu |  Mặc định  |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    page       |    number |  1  |   Phân trang        |
    |    limit       |    number |  10  | Số lượng tối đa trả về |     

 - Body:

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data       |    object        | [ KeySearch object](#data-structure-keysearch-object)|  
    |   status     |    boolean       | true - thành công, false - thất bại                  |  
    |   message    |    string        | Tin nhắn trả về                                      |  


### 2.3  Từ khóa người dùng tìm kiếm nhiều nhất
 - Router: **/api/key-search/count-user**  
 - Function: **count_search_user()**  
 - Method: **GET**
 - Header:
   
    | Tên Trường  | Kiểu dữ liệu |  Mặc định  |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    Authorization       |    string |  null  |   Token đăng nhập        |

 - Paremeter: 
    
     | Tên Trường  | Kiểu dữ liệu |  Mặc định  |               Mô tả                  |  
    |:----------:  |:------------:|:------------:    |:--------------------------------:    |  
    |    page       |    number |  1  |   Phân trang        |
    |    limit       |    number |  10  | Số lượng tối đa trả về |     

 - Body:

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data       |    object        | [ KeySearch object](#data-structure-keysearch-object)|  
    |   status     |    boolean       | true - thành công, false - thất bại                  |  
    |   message    |    string        | Tin nhắn trả về                                      |  
