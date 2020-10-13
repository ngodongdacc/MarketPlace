const { request } = require("express")
const rq = require("request-promise");

const { error_400, error_500, success } = require("../../validator/errors");
module.exports = {
    login_facbook: (req,res,next) => {
        
        return res.send(req.user);
        // if(!req.body.input_token || req.body.input_token === "")
        //     return error_400(res,"Vui lòng nhập input_token","input_token")

        // if(!req.body.access_token || req.body.access_token === "")
        //     return error_400(res,"Vui lòng nhập access_token","access_token")
        // var options = {
        //     method: 'GET',
        //     uri: 'https://graph.facebook.com/debug_token',
        //     qs: {
        //         input_token: req.body.input_token,
        //         access_token: req.body.access_token // -> uri + '?access_token=xxxxx%20xxxxx'
        //     },
        //     headers: {
        //         'User-Agent': 'Request-Promise'
        //     },
        //     json: true
        // };
        // // return res.send("res");
        // rq(options)
        //     .then(result => {
        //         if(result.data && result.data.is_valid){
                        
        //         } else {

        //         }
                
        //     })
        //     .catch(e => {
        //         console.log(e.error);
        //         error_400(res, e.error.error.message, e.error)
        //     })
    }
}