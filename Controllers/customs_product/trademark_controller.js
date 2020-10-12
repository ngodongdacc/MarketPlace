const Trademark = require("../../Model/trademark");
const TrademarkService = require("../../Services/trademarkService");
const async = require("async");

module.exports = {
    postcreateTrademark: async (req, res, next) => {
        try {
            const { nameTrademark} = req.body

            const newTrademark = new Trademark({

                nameTrademark: req.body.nameTrademark
            })

            TrademarkService.createTrademark(newTrademark, (err, trademark) => {
                if (err) res.status(400).json({ message: "There was an error processing", errors: err, code: 0 });
                return res.send({
                    message: "create trademark success",
                    data: {
                            nameTrademark: trademark.nameTrademark
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
    postdeleteTrademark: (req, res) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Id is required", status: false, code: 0 })

        TrademarkService.findOneTrademarkByID(id, (err, restrademark) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            Trademark.findByIdAndRemove(id, {nameTrademark:req.body.nameTrademark}, (err, resRemoveTrademark) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "Delete trademark success",
                    data: resRemoveTrademark,
                    status: true,
                    code: 1
                })
            })
        })
    },

    postupdateTrademark: async (req, res, next) => {
        const trademarkUpdate = { };
        if (req.body.nameTrademark) trademarkUpdate.nameTrademark = req.body.nameTrademark;

        const { id } = req.params

        if (!id) return res.status(400).json({ message: "id is required", status: false, code: 0 })

        TrademarkService.findOneTrademarkByID(id, (err, resFindTrademark) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });

            Trademark.findByIdAndUpdate(id,{nameTrademark:req.body.nameTrademark},(err, restrademark) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "update Thuong hieu success",
                    data: restrademark,
                    status: true,
                    code: 1
                })
            })

        })

    },

    getProfile : async (req, res) => {
       try{
           const trademark = await Trademark.find()
           res.json(trademark)
       }catch(err){
           res.send('Error ' + err)
       }
      },
    
}