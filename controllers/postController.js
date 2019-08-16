const Post = require('./../models/post');
const User = require('./../models/user');

// Update Post based on User ID
function UpdatePost(req, res){
    Post.findById(req.params.id)
    .then((data)=>{
        console.log(data.user._id)

        // Checking if the user id same with the creator
        if(data.user._id != req.query.user_id){
           return res.status(422).json("This is not your Post");

        }
        
        Post.findByIdAndUpdate(req.params.id,
            {
                $set: {title: req.body.title, body: req.body.body}
            }).then((data)=>{
                res.status(200).json(`${req.body.title} succesfully Updated!`)
            })
            .catch((err)=>{
                res.status(422).json({error: err})
            })
    })
    .catch((err)=>{
        res.json({error: err})
    })
}


// show All Post List
function showAllPost(req, res){
    Post.find({}).populate('user', 'name').then((data)=>{
        res.status(200).json(data)
    })
    .catch((err)=>{
        if(err) return res.status(422).json({error: err})
    })
}


// delete Post Based on User ID
function deletePost(req, res){

    // get Post ID on URL
    Post.findById(req.params.id)
    .then((data)=>{
        console.log(data)

        // check if user ID same with the User ID on database
        if(data.user._id != req.query.user_id){
            return res.status(422).json("This is not your Post!");
        }

        // Delete by Id
        Post.findOneAndRemove(req.params.id, 
        function(err, data){
            if(err) return res.status(422).json({error: err});

            res.status(200).json(`${data.title} already deleted from database!`);
        })

    })
    .catch((err)=>{
        if(err) return res.status(422).json({error: err})
    })
}


module.exports = { UpdatePost, showAllPost, deletePost};

