// app/models/reward.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema
 var RewardSchema = new Schema(
{
	rewardName: String,
	rewardOwner: String,
	rewardWorth: Number,
	enabled: Boolean,
	description: String
});
 module.exports = mongoose.model('Reward', RewardSchema);