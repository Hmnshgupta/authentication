const User = require('../models/user')


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