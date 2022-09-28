const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const BOOK_IMAGE = path.join('/uploads/Book');
const Bookschema = mongoose.Schema({
    title : {
        type:String,
        require:true
    },
    author : {
        type:String,
        require:true
    },
    publisher : {
        type:Array,
        require:true
    },
    category : {
        type:String,
        require:true
    },
    pages : {
        type:String,
        require:true
    },
    description : {
        type:String,
        require:true
    },
    date : {
        type:String,
        require:true
    },
    rating :{
        type:String,
        require:true
    },
    frontimage : {
        type:String,
        require:true
    }
});

const BookStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',BOOK_IMAGE));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});

Bookschema.statics.ImageUpload = multer({storage : BookStorage}).single('avatar');
Bookschema.statics.ImagePath = BOOK_IMAGE;


const Book = mongoose.model('tbl_Book',Bookschema);
module.exports = Book;