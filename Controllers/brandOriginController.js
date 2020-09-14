const BrandOrigin = require("../Model/brandOrigin");
const BrandOriginService = require("../Services/brandOriginServide");
const async = require("async");

module.exports = {
    postcreateBrandOrigin: async (req, res, next) => {
        try {
            const { nameTrademark, country} = req.body

            const newBrandOrigin = new BrandOrigin({

                nameTrademark: req.body.nameTrademark,
                country: req.body.country
            })

            BrandOriginService.createBrandOrigin(newBrandOrigin, (err, brandOrigin) => {
                if (err) res.status(400).json({ message: "There was an error processing", errors: err, code: 0 });
                return res.send({
                    message: "create user success",
                    data: {
                            nameTrademark: brandOrigin.nameTrademark,
                            country: brandOrigin.country
                    },
                    code: 1,
                    status: true
                })
            });
        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }
    },
    postdeleteBrandOrigin: (req, res) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id is required", status: false, code: 0 })

        BrandOriginService.findOneBrandOriginByID(id, (err, resbrandOrigin) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            BrandOrigin.findByIdAndRemove(id, {nameTrademark:req.body.nameTrademark,country:req.body.country}, (err, resRemoveBrandOrigin) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "Delete thuong hieu success",
                    data: resRemoveBrandOrigin,
                    status: true,
                    code: 1
                })
            })
        })
    },

    postupdateBrandOrigin: async (req, res, next) => {
        const brandOriginUpdate = { };
        if (req.body.nameTrademark) brandOriginUpdate.nameTrademark = req.body.nameTrademark;
        if (req.body.country) brandOriginUpdate.country = req.body.country;

        const { id } = req.params

        if (!id) return res.status(400).json({ message: "id is required", status: false, code: 0 })

        BrandOriginService.findOneBrandOriginByID(id, (err, resFindBrandOrigin) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            BrandOrigin.findByIdAndUpdate(id,{nameTrademark:req.body.nameTrademark, country:req.body.country},(err, resbrandOrigin) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "update Thuong hieu success",
                    data: resbrandOrigin,
                    status: true,
                    code: 1
                })
            })

        })

    },

    getProfile : async (req, res) => {
       try{
           const brandOrigin = await BrandOrigin.find()
           res.json(brandOrigin)
       }catch(err){
           res.send('Error ' + err)
       }
      },
    
}