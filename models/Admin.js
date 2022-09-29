const mongoose = require('mongoose');

const findOrCreate = require('mongoose-findorcreate');

const multer = require('multer');

const path = require('path');

const PROFILE_PATH = path.join('/uploads/Admin');

const AdminSchema = mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    email : {
        type:String,
        require:true,
       
    },
    password : {
        type:String,
        require:true
    },
    gender : {
        type:String,
        require:true
    },
    hobby : {
        type:Array,
        require:true
    },
    city : {
        type:String,
        require:true
    },
    address : {
        type:String,
        require:true
    },
    profile : {
        type:String,
        require:true
    }
 
});




const ProfileStore = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",PROFILE_PATH));
    },
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});







AdminSchema.statics.UploadImage = multer({storage : ProfileStore}).single('avatar');
AdminSchema.statics.ImagePath = PROFILE_PATH;

const Admin = mongoose.model('tbl_Admin',AdminSchema);
module.exports = Admin;