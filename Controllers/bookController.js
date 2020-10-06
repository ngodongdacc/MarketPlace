const Books = require("../Model/book");

module.exports = {
     add_book:  (req,res) => { 
        
        let nameParam = req.query.name; 
        let id = req.params.id; 
        let nameBody = req.body.name; 
        
        // return res.send("téa")
        return res.send({
            query:  nameParam,
            id : id,
            body: nameBody
         })
    }
}