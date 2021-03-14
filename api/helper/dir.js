const fs = require('fs');
const path = require('path');

async function createdDir() {
    return async (req, res, next) => { 
        const  dirname = req.body.dirname;
        console.log("dir:: ", req.body);
        const dir = path.join(base__dirname, '/Public/images/' + dirname);
        // check if directory exists
        if (fs.existsSync(dir)) {
            console.log('Directory exists!');
        } else {
            console.log('Directory not found.');
        }
        next();
    }
}

module.exports = {
    createdDir
}