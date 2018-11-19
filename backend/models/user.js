// app/models/user.js


var mongoose = require('mongoose');
var Schema = mongoose.Schema 


var UserSchema = new Schema(
{
	email: String,
	password: String,
    userLevel: String,
    pointCount: Number,
    token: String,

    history: Array
});


module.exports = mongoose.model('User', UserSchema);
