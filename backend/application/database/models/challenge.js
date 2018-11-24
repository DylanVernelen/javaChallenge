// app/models/challenge.js


var mongoose = require('mongoose');
var Schema = mongoose.Schema 


var ChallengeSchema = new Schema(
{
	challengeName: String,
	challengeOwner: String,
	challengeWorth: Number,
});


module.exports = mongoose.model('Challenge', ChallengeSchema);
