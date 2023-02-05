const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://himanshu:Himanshu@cluster0.aijdqcn.mongodb.net/test");
mongoose.connect("mongodb://127.0.0.1:27017")
const db = mongoose.connection;
mongoose.set('strictQuery', true);


db.on('error',console.error.bind('console','We did something wrong'));

db.once('open',function(){
    console.log('Our DB server is up and running');
})