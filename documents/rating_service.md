# I.  Rating service
## 1. Database info
##### Database type: Mongodb
##### Database Name: marketplace
##### Conllection type: Rating
##### Data structure (Rating object)

|Stt|Tên trường| Kiểu dữ liệu | Giá mặc định | Bắt buộc | Mô tả |
|:------------------:|:------------------:  |:------------:    |:----------------:    |:--------:    |:--------------------------------------------------:  |  
|1| _id               | ObjectId  | random | required | Id của sản phẩm |
|2| Star              | Number    |           | required | Tên của sản phẩm |
|3| IdUser            | ObjectId  |           | required | Id của tài khoản xếp hạng |
|4| IdProduct         | ObjectId  |           | required | Id của sản phẩm xếp hạng |

## 2. Service info  
### Thông tin service * Tên service: **(Rating**  
* Source code: ./Controller/(rating_controller.js  
* Danh sách routers  
   * [2.1: Thêm xếp hạng mới](#21--thêm-xếp-hạng-mới)  
   * [2.2: Lấy số lượng xếp hạng sản phẩm ](#22--Lấy-số-lượng-xếp-hạng-sản-phẩm)  
   
### 2.1  Thêm sản phẩm mới  
 - Router: **/api/rating/add**  
 - Function: **add_rating()**  
 - Method: **POST**
 - Paremeter: 
 - Body:

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    body     |    object |         [ Rating object](#data-structure-rating-object)      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object        | [ Rating object](#data-structure-rating-object)       |  
    |   status     |    boolean         | true: thành công, false: thất bại                  |  
    |   message    |    string        | Tin nhắn trả về                                      |  

### 2.2  Lấy số lượng xếp hạng sản phẩm  
 - Router: **/api/rating/count**  
 - Function: **count_rating_product()**  
 - Method: **get**
 - Paremeter: 

    | Tên Trường  | Kiểu dữ liệu     |               Mô tả                  |  
    |:----------:  |:------------:    |:--------------------------------:    |  
    |    idProduct     |    ObjectId |         id của sản phẩm      |

- Dữ liệu trả về

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   data      |    object           | Dữ liệu trả về       |  
    |   status     |    boolean         | true: thành công, false: thất bại                  |  
    |   message    |    string          | Tin nhắn trả về                                      |  

    + data

    | Tên Trường   | Kiểu dữ liệu     |                        Mô tả                         |  
    |:----------:  |:------------:    |:---------------------------------------------------: |  
    |   counts      |    array           | thứ tự số lượng trả về tương ứng: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]       |  
    