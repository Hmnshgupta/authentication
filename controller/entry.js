const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('index',{
        title : "Completion"
    })
}

module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        title : "My Sign In Page"
    })
}

module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title : "My Sign Up Page"
    })
}

module.exports.create = function(req,res){
     
    if(req.body.password != req.body.confirmpassword){
        
     return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('errorin creating while the user'); return;}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('errorin creating while the user'); return;}
                // console.log(user);
                return res.redirect('/signin');
            })
           
        } else{
            return res.redirect('back');
        }
    })
    
}

//SignIn and create s asession for the user
module.exports.createSession = function(req,res){
     //find the user
     User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('errorin creating while the user in SignIn'); return;}
        //handle user found
        if(user){
            //handlepassword which doesnot match
            if(user.password != req.body.password){
                // console.log("Password Note match");
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            // console.log("session created")
            return res.redirect('/');  
        }else{
            //handle user not found
            return res.redirect('back');
        }
    })
}