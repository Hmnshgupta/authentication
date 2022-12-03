const express = require('express');
const port = 1500;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mogoosedb');
const app = express();

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/Passport-localStragey');
const { initialize } = require('passport');
const MongoStore = require('connect-mongo');

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

//mongo store is used to store the session cookie in db
app.use(session({
    name : 'Authentication',
    //change the secreate before deployment before the production mode
    secret : 'Himanshu#$%^',
    saveUninitialized : false,
    resave : false,
    cookie : {
            maxAge :  ( 1000 * 60 * 100 )
    },
    //Storing the session on the mondo so after restarting the server we don't sign in again
    store :  MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1:27017',
            autoRemove : 'disabled' 
        },
        function(err){
             console.log(err || 'connect mongo steup is OK')
        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)


// app.use(bodyParser.urlencoded({extended : false}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);

//use of express router
app.use('/',require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log.bind(`Issue in connection with Port ${err}`);
        return;
    }

    console.log(`Congratulation is Up and running ${port}`);
})