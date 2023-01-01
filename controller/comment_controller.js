const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    console.log(req.body);
    Post.findById(req.body.post,function(err,post){
        console.log(post);
        if(post){
        
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){
                if(err){console.log(`Error in craeting a post ${err}`);return;}
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
    
}