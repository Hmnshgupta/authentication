const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://DatabaseRelation:9IZAAYq2zX65EiRk@cluster0.ficu19y.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;

db.on('error',console.error.bind('console','We did something wrong'));

db.once('open',function(){
    console.log('Our DB server is up and running');
})