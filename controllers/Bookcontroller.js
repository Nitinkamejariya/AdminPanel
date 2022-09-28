const Book = require('../models/Book');

const path = require('path');

const fs = require('fs');
module.exports.BookPage = (req,res)=>{
    return res.render('Add_Book');
}

module.exports.BookAdd = (req,res)=>{
    Book.ImageUpload(req,res,(error)=>{
        if(error){
            console.log('Image not uploaded');
            return false;
        }
        if(req.file){
            avatar = Book.ImagePath+"/"+req.file.filename;
            Book.create({
                title : req.body.title,
                author : req.body.author,
                publisher : req.body.publisher,
                category : req.body.bookcat,
                pages : req.body.pages,
                description : req.body.description,
                date : req.body.date,
                rating : req.body.rating,
                frontimage : avatar
            },(error)=>{
                if(error){
                    console.log('Book Not Added');
                    return false;
                }
                req.flash('success','Book Added Successully..!');
                return res.redirect('/Book');
            })
        }
    })
}

module.exports.ViewBook = async(req,res)=>{
    try {
        var BookData = await Book.find({});
        if(BookData){
            return res.render('View_Book',{
                'AllBook' : BookData
            });
        }
        else{
            console.log('Book Not found');
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports.updateBook = async(req,res)=>{
    try {
        var BookData = await Book.findById(req.query.id);
        if(BookData){
            return res.render('Edit_Book',{
                'brecord' : BookData
            });
        }
        else{
            console.log('record not found');
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.EditBook = (req,res)=>{
    Book.ImageUpload(req,res,(error,)=>{
        if(error){
            console.log('image not upload');
            return false;
        }
        if(req.file){
            Book.findById(req.body.e_id,(error,record)=>{
                if(error){
                    console.log('record not found');
                    return false;
                }
                if(record.frontimage){
                    fs.unlinkSync(path.join(__dirname,'..',record.frontimage));
                }
                const avatar = Book.ImagePath+"/"+req.file.filename;
                Book.findByIdAndUpdate(req.body.e_id,{
                    title : req.body.title,
                    author : req.body.author,
                    publisher : req.body.publisher,
                    category : req.body.bookcat,
                    pages : req.body.pages,
                    description : req.body.description,
                    date : req.body.date,
                    rating : req.body.rating,
                    frontimage : avatar
                },(error)=>{
                    if(error){
                        console.log('Book Not Updated');
                        return false;
                    }
                    req.flash('success','Book Detail Successfull Update..!');
                    return res.redirect('/Book/ViewBook');
                });
            });
        }
        else{
                    Book.findById(req.body.e_id,(error,data)=>{
                        if(error){
                            console.log('record not found');
                            return false;
                        }
                        const avatar = data.ImagePath;
                        Book.findByIdAndUpdate(req.body.e_id,{
                            title : req.body.title,
                            author : req.body.author,
                            publisher : req.body.publisher,
                            category : req.body.bookcat,
                            pages : req.body.pages,
                            description : req.body.description,
                            date : req.body.date,
                            rating : req.body.rating,
                            frontimage : avatar
                        },(error)=>{
                            if(error){
                                console.log('Book not updated');
                                return false;
                            }
                            req.flash('success','Book Detail Successfull Update..!');
                            return res.redirect('/Book/ViewBook');
                        });
                    });
        }
    });
}

module.exports.removeBook = (req,res)=>{
    Book.findById(req.query.id,(error,data)=>{
        if(error){
            console.log('Book Not found');
            return false;
        }
        if(data.frontimage){
            fs.unlinkSync(path.join(__dirname,'..',data.frontimage));
        }
        Book.findByIdAndDelete(req.query.id,(error)=>{
            if(error){
                console.log('Book not remove');
                return false;
            }
            req.flash('success','Book  Successfull Remove..!');
            return res.redirect('/Book/ViewBook');
        })
    })
}