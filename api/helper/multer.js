const multer = require('multer');
const path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(base__dirname,'/Public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
var upload = multer({ storage: storage })

module.exports = upload;