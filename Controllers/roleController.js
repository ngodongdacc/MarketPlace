const Role = require("../Model/role");
const {error_500,error_400, success} = require("../validator/errors");

module.exports = {
    create_role: (req,res) => {
        let {Roles, Title} = req.body;

        if(!Title || Title === "") 
           return error_400(res,"Vui lòng nhập Title","Title") 

        Role.findOne({Title: Title},(e,r) => {
           if(e) 
               return error_500(res,e);
           else if(r) 
               return error_400(res,"Loại tài khoản đã tồn tại", "Title");
           else 
                Role.create({Title: Title, Roles: Roles},
                            (e,role) => {
                                if(e) return error_400(res,e)
                                success(res,"Thêm loại thành công",role)
                            })
        })
    },
    
    /* tìm kiếm loại tài khoản 
    * paramer: 
    *   + search: string
    *   + page: number,
    *   + limit: number
    *   + sort: string
    * results: object
    */
    search: (req, res) => {
        
        let search = req.body.search,
        page =  req.body.page ? req.body.page : 1,
        limit = req.body.limit ? req.body.limit: 20,
        sort = req.body.sort ? req.body.sort: "Title",
        skip = (page-1)*limit,
        query = {};
        if(search) query.$text = { $search: search };

        Role.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec((e,r)=>{
                if(e) return error_500(res,e)
                return success(res,"Lấy danh sách loại tài khoản thành công",r)
            })

    }
}