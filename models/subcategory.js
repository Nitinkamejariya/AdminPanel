const mongoose = require('mongoose');
const { Schema } = mongoose;
const subcategorySchema = mongoose.Schema({
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'tbl_Category'
    },
    subcategory:{
        type:String,
        require:true
    }
});

const SubCategory = mongoose.model('tbl_subcategory',subcategorySchema);
module.exports = SubCategory;