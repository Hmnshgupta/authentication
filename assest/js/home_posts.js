{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data) {
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },error : function(error){
                    console.log(error.responseText);
                }
            })
           
        })
    }

    
 //method to create a post in DOM
 let newPostDom = function(post){
    return $(`
                <li id="post-${post._id}">
                                ${post.content}
                                ${post.user.name}
                                
                            
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                                
                            
                                <div id = "post-comments">
                                
                                        <form action="/comments/create" method="POST">
                                            <input type="text" name="content" placeholder="Type Here to add comment">
                                            <input type="hidden" name="post" value="${post._id }">
                                            <input type="submit" value="Add Comment"> 
                                        </form>
                                
                            
                                    <div id="post-comment-list">
                                        <ul id="post-comments - ${post._id}">
                                        
                                        </ul>
                                    </div>
                                    
                                </div>
                </li>
        `)
    }


    ////method to delete a post in DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'Get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    createPost();
}