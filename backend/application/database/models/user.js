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
	uniqueid: String
});


var HistorySchema = new Schema(
{
	rewardid: String,
	pointsSpent: Number,
	timestamp: Number,
	opgehaald: Boolean,
	uniqueid: String
});

var UserSchema = new Schema(
{
	email: String,
	password: String,
    userLevel: String,
    pointCount: Number,
    token: String,
    history: [HistorySchema],
    challenges: [ChallengeSchema]
});

module.exports = mongoose.model('User', UserSchema);
