const User = require('./../models/user');
const Post = require('./../models/post');
const _    = require('lodash');

// to encrypt the password
const bcrypt = require('bcrypt');

// get Validation function
const {validationRegister, validationPost, validationLogin} = require('./../helper/validator'); 

// Register new User Function
async function createUser(req, res){
    // checking if there is any error at req.body
    const { error } = validationRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // to check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already Registered.');

    // create new user
    user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    
    // Encrypt the Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    // save the User
    const result = await user.save();
    // response or output from function    
    res.status(200).json(result);
}


// Login Controller
async function loginUser(req, res){
    // check if user input the right input
    const { error } = validationLogin(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email are not Registered!');

    // check if the password that store in DB same with the User input
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json('there is something wrong with your password!');


    // generate json Token
    const token = user.generateAuthToken();
    res.status(200).json({token})
};


// to check the current user
async function current_user(req, res){
    // check if user input the right input
    const { error } = validationLogin(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email are not Registered!');

     // check if the password that store in DB same with the User input
     const validPassword = await bcrypt.compare(req.body.password, user.password)
     if(!validPassword) return res.status(400).json('there is something wrong with your password!');
     
    // Decryption the token to get User Information
    const token = user.generateAuthToken();
    res.header('authentication-token', token).send(_.pick(user, ['_id', 'name', 'email']))
}

// insert Post
async function insertPost(req, res){
    // checking if there is any error inputs
    const { error } = validationPost(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post({title: req.body.title, body: req.body.body, user: req.user._id})
    .populate('user', 'name')
    // save data
    const result = await post.save();
    res.status(200).json(result);
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
  User.findById(req.params.id).populate('posts', 'title')
  .then((data)=>{
      res.status(200).json(data)
  })
  .catch((err)=>{
      if(err) return res.status(422).json({error: err})
  })
}




module.exports = {createUser, loginUser, current_user, insertPost, showAllUser, userPostList};

