const Origin = require("../Model/origin");
const OriginService = require("../Services/originService");
const async = require("async");

module.exports = {
    postcreateOrigin: async (req, res, next) => {
        try {
            const {countrys} = req.body

            const newOrigin = new Origin({
                
                countrys: req.body.countrys
            })

            OriginService.createOrigin(newOrigin, (err, origin) => {
                if (err) res.status(400).json({ message: "There was an error processing", errors: err, code: 0 });
                return res.send({
                    message: "create origin success",
                    data: {

                            countrys: origin.countrys
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
    postdeleteOrigin: (req, res) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id is required", status: false, code: 0 })

        OriginService.findOneOriginByID(id, (err, resorigin) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            Origin.findByIdAndRemove(id, {countrys:req.body.countrys}, (err, resRemoveOrigin) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "Delete origin success",
                    data: resRemoveOrigin,
                    status: true,
                    code: 1
                })
            })
        })
    },

    postupdateOrigin: async (req, res, next) => {
        const originUpdate = { };

        if (req.body.countrys) originUpdate.countrys = req.body.countrys;

        const { id } = req.params

        if (!id) return res.status(400).json({ message: "id is required", status: false, code: 0 })

        OriginService.findOneOriginByID(id, (err, resFindOrigin) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            Origin.findByIdAndUpdate(id,{countrys:req.body.countrys},(err, resorigin) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "update origin success",
                    data: resorigin,
                    status: true,
                    code: 1
                })
            })

        })

    },

    getProfile : async (req, res) => {
       try{
           const origin = await Origin.find()
           res.json(origin)
       }catch(err){
           res.send('Error ' + err)
       }
      },
    
}