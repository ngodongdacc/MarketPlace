

async function uploadImages(req,res,next){
    console.log("req:: ", req.body);
    res.json({ text: 'test' });
}

module.exports = {
    uploadImages
}