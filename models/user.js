const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// get the configuration
const config = require('config');
// get jwt token for login
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, name: this.name, email: this.email}, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);



exports.User = User; 