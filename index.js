const config = require('config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
// for database Connection
const dbConnection = {
    development: "mongodb+srv://angellee177:5LWN2FrrmyVEa7F@cluster0-bgfog.mongodb.net/test?retryWrites=true&w=majority",
    test: "mongodb://localhost/test",
    production:  "mongodb+srv://angellee177:5LWN2FrrmyVEa7F@cluster0-bgfog.mongodb.net/test?retryWrites=true&w=majority"
}

// to connect with database
const env = process.env.NODE_ENV || 'development';


app.use(express.json());

console.log(dbConnection[env])

// check if the config already connected
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

// Using Route Level Middleware
const router = require('./routes');
app.use("/api", router);


// get root path from "http://localhost:5001/"
app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to API!"
    });
});


// get Swagger File for documentation
const swaggerFile = require('./swagger.json');
// get Swagger Ui
const swaggerUI = require('swagger-ui-express');
// get Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
    express.urlencoded({
        extended: true
    })
);


// Root Path, get the Public Path
app.use(express.static('public'))


const User = require('./models/user');
const { success, errorMessages } = require('./helper/response');

console.log(User)
// get upload photo
const multer= require('multer');
// to convert buffer from "req.file" to datauri
 const Datauri = require('datauri');
 const datauri = new Datauri();
// require the Cloudinary to upload Media to CLoud Server
const cloudinary = require('cloudinary').v2

// config the CLoudinary
cloudinary.config({
    api_key: "126537498353442",
    api_secret: "YCrfoEhfeOr6h4vFsO1TrYWGEtA",
    cloud_name: "dhqkkig7z"
})

const upload = multer().single('picture')
const _    = require('lodash');
// Upload Single File
app.post('/posting', upload, auth, function(req, res){
                        const file = datauri.format(`${req.file.originalname}-${Date.now()}`, req.file.buffer);
                        cloudinary.uploader.upload(file.content)
                        .then(data =>{
                            console.log(data)
                            User.findOneAndUpdate({_id: req.user._id},
                                {
                                    $set: {profile_picture: data.url},
                                    
                                }, 
                                {new: true}, 
                                function(err, result){
                                    if(err) return res.status(422).json(err);
                                    
                                   res.status(200).json(_.pick(result, ['_id', 'name', 'email', 'profile_picture']))
                                }
                            )
                            // res.status(200).json(data)
                        })
                        .catch(err => {
                            res.status(422).json(err);
                            })
                    })


// to connect with the DB
try{
    mongoose.connect(dbConnection[env], 
    { useNewUrlParser: true, useCreateIndex: true})

    app.listen(port, () => {
        console.log(`Server Started at ${Date()}!`);
        console.log(`Listening on port ${port}!`);
        });

    console.log("success connect to database")
}
catch(error){
    handleError(error);
};




    
    // module.exports = app;



