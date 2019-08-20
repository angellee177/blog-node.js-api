const config = require('config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dbConnection = {
    development: "mongodb+srv://angellee177:<password>@cluster0-bgfog.mongodb.net/test?retryWrites=true&w=majority",
    test: "mongodb://localhost/test"
}

// to connect with database
const env = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// to connect with the DB
mongoose.connect('mongodb+srv://angellee177:<password>@cluster0-bgfog.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true});


// check if the config already connected
// if (!config.get('jwtPrivateKey')){
//     console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//     process.exit(1);
// }

// Using Route Level Middleware
const router = require('./routes');
app.use("/api", router);


app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to API!"
    });
});



app.listen(port, () => {
    console.log(`Server Started at ${Date()}!`);
    console.log(`Listening on port ${port}!`);
    });
    
    module.exports = app;



