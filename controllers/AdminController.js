const Admin = require('../models/Admin');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const options = require('../helpers/makepdf');

const nodemailer = require('../config/nodemailer');
module.exports.Dashboard = (req,res)=>{
    return res.render('Dashboard');
}

module.exports.AddAdmin = (req,res)=>{
    return res.render('Add_Admin');
}

module.exports.A_login = (req,res)=>{
    return res.render('Admin_login',{'layout' : false});
}

module.exports.LoginData = (req,res)=>{
    req.flash('success','Admin Login Successfully..!');
    return res.redirect('/Dash');
}

module.exports.Adminlogout = (req,res)=>{
    req.logout((error)=>{
        if(error){
            console.log('something went to wrong');

            return false;
        }
        req.flash('success','Admin Loging Out Successfully..!');
        return res.redirect('/');
    })
}

module.exports.AdminInsert = (req,res)=>{
    Admin.UploadImage(req,res,(error)=>{
        if(error){
            console.log('image not uploaded');
        }
        if(req.file){
         const avatar = Admin.ImagePath+"/"+req.file.filename;
         const name = req.body.fname+" "+req.body.lname;
         Admin.create({
            name : name,
            email : req.body.email,
            password : req.body.password,
            gender : req.body.gender,
            hobby : req.body.hobby,
            city : req.body.city,
            address : req.body.address,
            profile : avatar
         },(error)=>{
            if(error){
                console.log('record not added');
                // return false;
            }
            req.flash('success','Admin Register Successfully..!');
            return res.redirect('/AddAdmin');
         });
        }
    });
}

module.exports.ViewAdmin = async(req,res)=>{
    try{
        let Record = await Admin.find({});
        if(Record){
                return res.render('View_Admin',{
                    'showAdmin' : Record
                });
        }
        else{
            console.log('Admin Not found');
            return false;
        }
    }
    catch(error){
        console.log(error);

    }
}
module.exports.AdminProfile = (req,res)=>{
    return res.render('Admin_profile');
}

module.exports.updateAdmin = async(req,res)=>{
    try {
        var Adata = await Admin.findById(req.query.id);
        if(Adata){
            return res.render('Edit_Admin',{
                'record' : Adata
            });
        }
        else{
            console.log('Admin not found');
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports.EditAdmin = (req,res)=>{
    Admin.UploadImage(req,res,(error)=>{
        if(error){
            console.log('Image not upload');
            return false;
        }
        if(req.file){
            Admin.findById(req.body.e_id,(error,Arecord)=>{
                if(error){
                    console.log('something wrong');
                    return false;
                }
                if(Arecord.profile){
                    fs.unlinkSync(path.join(__dirname,'..',Arecord.profile));
                }
                const avatar = Admin.ImagePath+"/"+req.file.filename;
                Admin.findByIdAndUpdate(req.body.e_id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    address : req.body.address,
                    profile : avatar
                },(error)=>{
                    if(error){
                        console.log('Admin record not updated');
                        return false;
                    }
                    req.flash('success','Admin Detail Suucessfully Update..!');
                    return res.redirect('/ViewAdmin');
                });
            });
        }
        else{
                Admin.findById(req.body.e_id,(error,data)=>{
                    if(error){
                        console.log('record not found');
                        return false;
                    }
                    const avatar = data.profile;
                    Admin.findByIdAndUpdate(req.body.e_id,{
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                        gender : req.body.gender,
                        hobby : req.body.hobby,
                        city : req.body.city,
                        address : req.body.address,
                        profile : avatar
                    },(error)=>{
                        if(error){
                            console.log('record not updated');
                            return false;
                        }
                        req.flash('success','Admin Detail Suucessfully Update..!');
                        return res.redirect('/ViewAdmin');
                    });
                });
        }
    });
}


module.exports.removeAdmin = (req,res)=>{
    Admin.findById(req.query.id,(error,data)=>{
        if(error){
            console.log('Admin not remove');
            return false;
        }
        if(data.profile){
            fs.unlinkSync(path.join(__dirname,'..',data.profile));
        }
        Admin.findByIdAndDelete(req.query.id,(error)=>{
            if(error){
                console.log('Admin not found');
                return false;
            }
            req.flash('success','Admin Remove Successfully..!');
            return res.redirect('/ViewAdmin');
        })
    })
}

module.exports.ChangePassword = async(req,res)=>{
    try {
        return res.render('change_pass');
    } catch (error) {
        console.log(error);
    }
}
module.exports.ResetPassword = (req,res)=>{
    var cpass = req.body.current_password;
    var npass = req.body.new_password;
    var con_pass = req.body.confirm_password;
   
    if(req.user.password == cpass){
        if(npass != cpass){
            if(npass == con_pass){
                Admin.findByIdAndUpdate(req.user.id,{
                    password : npass
                },(error,Updateadminpassword)=>{
                    if(error){
                        console.log('password not reset');
                        return false;
                    }
                    req.logout((error)=>{
                        if(error){
                            console.log('something wrong');
                            return false;
                        }
                        return res.redirect('/');
                    });
                });
            }
            else{
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    }
    else{
        return res.redirect('back');
    }
}
module.exports.AdminResetPassword = (req,res)=>{
    return res.render('forgot_pass',{layout : false});
}

module.exports.LostPassword = (req,res)=>{
    Admin.findOne({email : req.body.email},(error,Admindata)=>{
        if(error){
            console.log('email not  found');
            return false;
        }
        if(Admindata){

            var otp = Math.random();
            var newotp = parseInt(otp * 10000);

            res.cookie('email',req.body.email)
            res.cookie("otpgen",newotp);

            nodemailer.sendMail({
                from : 'nitsforever11@gmail.com',
                to : 'nitinkamejariya707@gmail.com',
                subject : 'send OTP',
                html : `Your OTP is=${newotp}`,
            },((error,info)=>{
                if(error){
                    console.log(error);
                    return false;
                }
                req.flash('success','Send OTP In Your Email..!');
                // console.log('Email send Successfully');
                return res.redirect('/EnterOTP');
            }));
        }
        else{
            console.log('Admin Email not found');
            return res.redirect('back');
        }
    });
}

module.exports.EnterOTP = async (req,res)=>{
    try {
        return res.render('OTP',{layout : false});
    } catch (error) {
        console.log(error);
    }
}
module.exports.verifyotp =async (req,res)=>{
     if(req.body.checkOTP == req.cookies.otpgen){
           req.flash('success','OTP is Correct..!','Please Set Your new Password');
            return res.redirect('/GenerateNewPassword');
        }
        else{
            return res.redirect('/EnterOTP');
        }

}

module.exports.GenerateNewPassword = async (req,res)=>{
    try {
        return res.render('Reset_pass',{layout : false});
    } catch (error) {
        console.log(error);
    }
}

module.exports.ResetNewpassword = (req,res)=>{
   
        if(req.body.npass == req.body.cpass){
             Admin.findOne({email : req.cookies.email},(error,admindata)=>{
                if(error){
                    console.log(error);
                    return false;
                }
                if(admindata){
                     Admin.findByIdAndUpdate(admindata.id,{
                        password : req.body.npass
                    },(error,AdminUpdatePassword)=>{
                        if(error){
                            console.log("Password not update");
                            return false;
                        }
                        res.cookie('email','');
                        res.cookie('otpgen','');
                        req.flash('success','Password Successfully Change..!');
                        return res.redirect('/')
                    })
                }
            })
        }
        else{
            return res.redirect('/GenerateNewPassword');
        }
   
}

module.exports.GeneratePdf = async(req,res,next)=>{
        const pdffile = fs.readFileSync(path.join(__dirname,'../views/View_Admin.html'),"utf-8");
        const filename = Math.random()+'_docs'+'.pdf';

        let AdminList = await Admin.find({});
        let array = [];

        AdminList.forEach(a=>{
            var list = {
                name : a.name,
                email : a.email,
                gender : a.gender,
                hobby : a.hobby,
                city : a.city,
                address : a.address
            }
            array.push(list);
        })

        var obj = {
            adminlist : array
        }

        var document = {
            html : pdffile,
            data : {
                arlist : obj,
            },
            path : './docs/'+filename
        }
        pdf.create(document,options)
        .then(res=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        })

        var filepath = 'http://localhost:9001/docs/'+filename;
        return res.render('DownloadPdf',{
            path : filepath
        })
}

module.exports.GoogleLogin = async(req,res)=>{
    res.redirect('/Dash');
}
