const passport = require('passport');
const LocalStrategy = require('passport-Local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    function(email,password,done){
        //find the user and establish the identity
        User.findOne({email : email},function(err,user){
            if(err){
                console.log('Error in finding user --> Paaport')
                return done(err);
            }

            if( !user || user.password != password){
                console.log('Error in finding user in Password area --> Paaport')
                return done(null,false);
            }

            return done(null,user);
        });
    }
))

//serializing the user to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
    return done(null,user.id);
})

//deserializing the user from the key in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            console.log('Error in finding user --> Paaport in deserializing ')
                return done(err);
        }

        return done(null,user);
    })
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to next function(Controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res. redirect('/signin');
}

passport.setAuthenticatedUser = function ( req ,res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just send this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;