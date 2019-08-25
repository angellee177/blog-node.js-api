const Post = require('./../models/post');
const User = require('./../models/user');
const { validationPost } = require('./../helper/validator');
const {success, errorMessages} = require('./../helper/response');

// Update Post based on User ID
function UpdatePost(req, res){
    // Decryption the token to get User Information
    Post.findById(req.params.id) // id post
    .then((data)=>{
        // console.log(data.user._id)
        // Checking if the user id same with the creator
        if(data.user._id != req.user._id){
           return res.status(422).json("This is not your Post");
        }

        Post.findByIdAndUpdate(req.params.id,
            {
                $set: {title: req.body.title, body: req.body.body, user: req.user._id}
            },{new: true}, 
            function(err, result){
                if(err) return res.status(422).json(err);
                res.status(200).json(success(result, "Successfully Update Article"))
                
            })
            console.log(req.params.id)
    })
    .catch((err)=>{
        res.json(err)
    })
}


// show All Post List
function showAllPost(req, res){
    Post.find({}).populate('user', 'name').then((data)=>{
        res.status(200).json(success(data, "here is your Post List"))
    })
    .catch((err)=>{
        if(err) return res.status(422).json(errorMessages)
    })
}


// Remove post from index
function removePost(post, elem) {
    var index = post.indexOf(elem);
    if (index > -1) {
      post.splice(index, 1);
    }
}

// delete Post Based on User ID
async function deletePost(req, res){
    // get the Post Id at Post Schema
    let post = await Post.findById(req.body.postId);

    // get the User ID at Post Schema
    let user = await Post.findOne({user: req.body.userId});

    // get the User Data based on Req.body.userId
    user = await User.findById(req.body.userId);
    console.log(user)

    // Delete the post from User Id
    removePost(user.post, post._id);

    // delete the post from Post Index
    post = await Post.findByIdAndDelete(req.body.postId);
    res.status(200).json(success(post, "Delete Article successfully!"));
  
}



module.exports = { UpdatePost, showAllPost, deletePost};

