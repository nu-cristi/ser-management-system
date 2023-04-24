const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require(bcrypt),
      SALT_WORK_FACTOR = 10;

//Creates database schema for a user object
const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});



module.exports = mongoose.model('User', userSchema);