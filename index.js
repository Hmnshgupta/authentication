const express = require('express');
const port = 1500;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mogoosedb');
const app = express();


app.set('view engine','ejs');
app.set('views','./views')




// app.use(bodyParser.urlencoded({extended : false}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log.bind(`Issue in connection with Port ${err}`);
        return;
    }

    console.log(`Congratulation is Up and running ${port}`);
})