const User = require('./../models/user');
const Post = require('./../models/post');

const _= require('lodash');
// for encrypt the Password
const bcrypt = require('bcrypt');

// Register new User Function
async function createUser(req, res){
    // to check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already Registered.');

    // create new user
    user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    
    // Encrypt the Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    await user.save(function(err){
        if(err) return res.status(422).json({error: err});

        // response or output from function    
        res.status(200).json(_.pick(user, ['_id','name', 'email', 'password']));
    })
}


// insert Post
async function insertPost(req, res){
    const post = new Post({title: req.body.title, body: req.body.body, user: req.params.id})
    // save data
    await post.save(function(err, data){
        if(err) return res.status(422).json({error: err});

        res.status(200).json(data);
    });
    

}


// Show User List
function showAllUser(req, res){
    User.find({}).then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        res.status(422).json({error: err});
    })
}


// Show User based on Id and get specify Post
function userPostList(req, res){
    User.findById(req.params.id).populate('posts')
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        res.status(422).json({error: err})
    })
}

module.exports = {createUser, insertPost, showAllUser, userPostList};

