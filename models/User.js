const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    userInfo: {type: Schema.Types.ObjectId, ref: 'UserInfo'},
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking for matching password
UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);