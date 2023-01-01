const User = require('../models/user')
const Post = require('../models/post')

module.exports.profile = function(req, res){
    return res.render('index',{
        title: 'My Profile Page'
    });
}

module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : 'MY  Codial Home Page',
    //         posts : posts
    //     });
    // })

    //Population the usr name on WEb page
    Post.find({}).populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title : 'MY  Codial Home Page',
            posts : posts
        });
    })
   
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('sign_in',{
        title : "My Sign In Page"
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
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

module.exports.craeteSession = function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res){
    req.logout((req.user, err => {
        if(err) return next(err);
        res.redirect("/");
      }));
      
 
    
}