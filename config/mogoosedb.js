const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/auth");
const db = mongoose.connection;

db.on('error',console.error.bind('console','We did something wrong'));

db.once('open',function(){
    console.log('Our DB server is up and running');
})