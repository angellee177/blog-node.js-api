// const Joi = require('@hapi/joi');

// // for Validate the Register Function
// function validationRegister(userSchema){
//     const schema = {
//         name: Joi.string().min(5).required(),
//         email: Joi.string().min(5).required().email(),
//         password: Joi.string()
//     }
//     return Joi.validate(userSchema, schema);
// }


// // for Validate the Login Function
// function validationLogin(userSchema){
//     const schema = {
//         email: Joi.string().email().required(),
//         password: Joi.string()
//     }
//     return Joi.validate(userSchema, schema)
// }


// // for validate the Post Function
// function validationPost(postSchema){
//     const schema = {
//         title: Joi.string().min(5).required(),
//         body: Joi.string().min(5).required()
//     }
//     return Joi.validate(postSchema, schema)
// }

// module.exports = {validationRegister, validationLogin,validationPost};

