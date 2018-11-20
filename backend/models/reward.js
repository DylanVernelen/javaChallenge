// app/models/reward.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RewardSchema = new Schema(
{
	rewardName: String,
	rewardOwner: String,
	rewardWorth: Number,
	rewardCategory: String,
	enabled: Boolean,
	description: String,
	imgUrl: String
});
 module.exports = mongoose.model('Reward', RewardSchema);