const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    // console.log("l5",req.body);
    Post.findById(req.body.post,function(err,post){
        // console.log('l7',post);
        if(post){
            Comment.create({

                content : req.body.content,
                post : req.body.post,
                user : req.user._id
                
            },function(err,comment){
                if(err){console.log(`Error in creating a post ${err}`);return;}
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            })
        }
    })
    
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){

            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull : {comments: req.params.id}},function(err,comment){
                return res.redirect('back');
            })  

        }
        else{
            return res.redirect('back');
        }
    })
}