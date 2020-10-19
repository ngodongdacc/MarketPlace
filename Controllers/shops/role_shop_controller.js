const RoleShopSchema = require("../../Model/roleShop");
const { error_500, error_400, success } = require("../../validator/errors");

module.exports = {
    create_role_shop: (req, res) => {
        let { Title } = req.body;

        if (!Title || Title === "")
            return error_400(res, "Vui lòng nhập Title", "Title")

        RoleShopSchema.findOne({ Title: Title }, (e, r) => {
            if (e)
                return error_500(res, e);
            else if (r)
                return error_400(res, "Loại tài khoản đã tồn tại", "Title");
            else
                RoleShopSchema.create({ Title: Title },
                    (e, role) => {
                        if (e) return error_400(res, e)
                        success(res, "Thêm loại thành công", role)
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
            page = req.body.page ? req.body.page : 1,
            limit = req.body.limit ? req.body.limit : 20,
            sort = req.body.sort ? req.body.sort : "Title",
            skip = (page - 1) * limit,
            query = {};
        if (search) query.$text = { $search: search };

        RoleShopSchema.find(query)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec((e, r) => {
                if (e) return error_500(res, e)
                return success(res, "Lấy danh sách loại tài khoản thành công", r)
            })

    },

    add_role_shop: (req, res) => {
        let { Title, RoleShop } = req.body
        if (!Title || Title === "")
            return error_400(res, "Vui lòng nhập Title", "Title");

        if (!RoleShop) return error_400(res, "Vui lòng nhập Role", "RoleShop");

        if (typeof RoleShop !== "number")
            return error_400(res, "Vui lòng nhập quyền là dạng số", "RoleShop");

        if (RoleShop < 0)
            return error_400(res, "Vui lòng nhập quyền lớn hơn 0", "RoleShop");

        RoleShopSchema.findOne({ Title: Title }, (e, r) => {
            if (e) return error_500(res, e)
            if (!r)
                return error_400(res, "Không tìm thấy loại tài khoản", "Title")

            let index = r.RoleShops.indexOf(RoleShop);
            if (index > 0)
                return success(res, `Thêm quyền ${RoleShop} vào ${Title} thành công`);

            r.RoleShops.push(Number(RoleShop));
            RoleShopSchema.findByIdAndUpdate(r._id, r, { new: true }, (e, r) => {
                if (e) return error_500(res, e);
                success(res, `Thêm quyền ${RoleShop} vào ${Title} thành công`);
            })
        })
    }
}