const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    CategoryName : {
        type : String,
        require : true
    }
});

const Category = mongoose.model('tbl_Category',CategorySchema);
module.exports = Category;