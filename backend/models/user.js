// app/models/user.js


var mongoose = require('mongoose');
var Schema = mongoose.Schema 

var ChallengeSchema = new Schema(
{
	challengeid: String,
	timestampAdded: Number,
	timestampCompleted: Number,
	challengeCompleted: Boolean,
	challengeStatus: String,
	pointsAwarded: Number,
	description: String,
	uniqueindex: String
});

var UserSchema = new Schema(
{
	email: String,
	password: String,
    userLevel: String,
    pointCount: Number,
    token: String,
    history: Array,
    challenges: [ChallengeSchema]
});

module.exports = mongoose.model('User', UserSchema);
