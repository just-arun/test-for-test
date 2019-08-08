const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req,file,cb)=>{
        const name = req.body.uname;
        cb(null,Math.floor(Math.random() * 999999) + path.extname(file.originalname));
    }
});
// upload variable
const upload = multer({
    storage: storage
}).single('image');


module.exports = upload;