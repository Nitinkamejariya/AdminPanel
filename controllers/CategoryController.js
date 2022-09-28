const Category =require('../models/category');
const SubCategory = require('../models/subcategory');


module.exports.Home = (req,res)=>{
    return res.render('Add_Category');
}

module.exports.AddCategory = async(req,res) =>{
    try {
            await Category.create({
                CategoryName : req.body.category
            },(error)=>{
                if(error){
                    console.log('category not added');
                    return false;
                }
                else{
                    return res.redirect('/category');
                }
            })
    } catch (error) {
        console.log(error);
    }
}
module.exports.ViewCategory = async(req,res)=>{
    try {
        const CateData = await Category.find({});
        if(CateData){
            return res.render('View_category',{
                'showcategory' : CateData
            });
        }
        else{
            console.log('category Not Found');
            return false
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateCategory = async(req,res)=>{
    try {
      var ecategory =   await Category.findById(req.query.id);
      if(ecategory){
            return res.render('Edit_category',{
                'erecord' : ecategory
            });
      }
      else{
        console.log('category not found');
      }
    } catch (error) {
        console.log(error);
    }
}

module.exports.EditCategory = (req,res)=>{
    try {
        Category.findById(req.body.e_id,(error)=>{
            if(error){
                console.log('category not found');
                return false;
            }
             Category.findByIdAndUpdate(req.body.e_id,{
                CategoryName : req.body.category
            },(error)=>{
                if(error){
                    console.log('category not update');
                    return false;
                }
                return res.redirect('/category/ViewCategory');
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.removeCategory = (req,res)=>{
    Category.findById(req.query.id,(error)=>{
        if(error){
            console.log('category not found');
            return false;
        }
        Category.findByIdAndDelete(req.query.id,(error)=>{
            if(error){
                console.log('category not remove');
                return false;
            }
            return res.redirect('/category/ViewCategory');
        })
    })
}

module.exports.AddSubCategory = async(req,res)=>{
    try {
       var catdata = await Category.find({});
       if(catdata){
        return res.render('Add_subcategory',{
            'data' : catdata
        });
       }
       else{
        console.log('record not found');
       }
    } catch (error) {
        console.log(error);
    }
}

module.exports.InsertSubCategory = async(req,res) =>{
    try {
        await SubCategory.create({
            categoryId : req.body.categoryId,
            subcategory : req.body.sub_category
        },(error)=>{
            if(error){
                console.log('subcategory not added');
                return false
            }
            else{
                return res.redirect('/category/AddSubCategory');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.ViewSubcategory = async(req,res)=>{
    try {
        var Subdata = await SubCategory.find({}).populate('categoryId').exec();
       
            return res.render('View_subcategory',{
                'record' : Subdata
            })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateSubCategory = async(req,res)=>{
    try {
       var catdata = await Category.find({});
        var subrecord = await SubCategory.findById(req.query.id);
       
            return res.render('Edit_subcategory',{
                'subinfo' : subrecord,
                'data' : catdata
            })
       
     
    } catch (error) {
        console.log(error);
    }
}

module.exports.EditSubCategory = (req,res)=>{
    try {
        SubCategory.findById(req.body.e_id,(error)=>{
            if(error){
                console.log('Subcategory not found');
                return false;
            }
            SubCategory.findByIdAndUpdate(req.body.e_id,{
                categoryId : req.body.categoryId,
                subcategory : req.body.sub_category

            },(error)=>{
                if(error){
                    console.log('Subcategory Not updated');
                    return false;
                }
                return res.redirect('/category/ViewSubcategory');
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.removeSubCategory = (req,res)=>{
    try {
         SubCategory.findById(req.query.id,(error)=>{
            if(error){
                console.log('Subcategory not found');
                return false;
            }
            SubCategory.findByIdAndDelete(req.query.id,(error)=>{
                if(error){
                    console.log('Subcategory Not Remove');
                    return false;
                }
                return res.redirect('/category/ViewSubcategory');
            })
         })
    } catch (error) {
        console.log(error);
    }
}