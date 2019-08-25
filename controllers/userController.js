const User = require('./../models/user');
const Post = require('./../models/post');
const _    = require('lodash');
const {success, errorMessage} = require('./../helper/response');

// to encrypt the password
const bcrypt = require('bcrypt');

// get Validation function
const {validationRegister, validationPost, validationLogin} = require('./../helper/validator'); 

// Register new User Function
async function createUser(req, res){
    // checking if there is any error at req.body
    // const { error } = validationRegister(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    // to check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(errorMessage('User already Registered.'));

    // create new user
    user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    
    // Encrypt the Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    
    // save the User
    const result = await user.save();
    // response or output from function    
    res.status(200).json(success(result,"successfully register!"));
}


// Login Controller
async function loginUser(req, res){
    // check if user input the right input
    // const { error } = validationLogin(req.body);
    // if(error) return res.status(400).json(error.details[0].message);

    // check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json(errorMessage('Email are not Registered!'));

    // check if the password that store in DB same with the User input
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json(errorMessage('there is something wrong with your password!'));


    // generate json Token
    const token = user.generateAuthToken();
    res.status(200).json(success({token}," you have been success Login"))
};


// to check the current user
async function current_user(req, res){
    // check if email already register
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json(errorMessage('Email are not Registered!'));

     // check if the password that store in DB same with the User input
     const validPassword = await bcrypt.compare(req.body.password, user.password)
     if(!validPassword) return res.status(400).json(errorMessage("it's not a valid password"));
     
    // Decryption the token to get User Information
    const token = user.generateAuthToken();
    res.header('authentication-token', token).send(success(_.pick(user, ['_id', 'name', 'email']), "HERE IS YOUR DATA"))
}


// Reset Password


// Delete User
function deleteUser(req, res){
    User.findByIdAndDelete(req.user._id, 
        function(err, data){
            if(err) return res.status(422).json({error: err});

            res.status(200).json(success(`successfully Deleted!! ${data}`))
    })
}


// insert Post
async function insertPost(req, res){
    // checking if there is any error inputs
    // const { error } = validationPost(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    // find the user
    let user = await User.findById(req.user._id);
    
    // create new post
    const post = new Post({title: req.body.title, body: req.body.body, user: req.user._id})
    .populate('user', 'name')
    // save data
    const result =  await post.save();

    user.post.push(post);
    const hasil_user_post =await user.save();
    res.status(200).json(success(result,hasil_user_post, "you have been successfull create new Article"));    
}


// Show User List
function showAllUser(req, res){
    User.find({}).populate('post', 'title')
    .then((data)=>{
        res.status(200).json(success(data,"here is the user list"));
    })
    .catch((err)=>{
        res.status(422).json({error: err});
    })
}


// Show User based on Id and get specify Post
function userPostList(req, res){
  User.findById({_id: req.user._id}).populate('posts', 'title')
  .then((data)=>{
      res.status(200).json(success(data, "this is your post."))
  })
  .catch((err)=>{
      if(err) return res.status(422).json({error: err})
  })
}




module.exports = {createUser, loginUser, current_user, deleteUser, insertPost, showAllUser, userPostList};

