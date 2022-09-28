const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BLOGAPP');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Not Connected'));

db.once('open',(error)=>{
    if(error){
        console.log('Database not Connect');
    }
    console.log('Database Connected');
});

module.exports = db;