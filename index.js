const config = require('config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

// get Swagger File for documentation
const swaggerFile = require('./swagger.json');

// get Swagger Ui
const swaggerUI = require('swagger-ui-express');

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


app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to API!"
    });
});



// get Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
    express.urlencoded({
        extended: true
    })
);

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



