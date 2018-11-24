// app/models/reward.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var RewardSchema = new Schema(
{
	name: String,
	owner: String,
	worth: Number,
	category: String,
	enabled: Boolean,
	description: String,
	imgUrl: String
});

module.exports = mongoose.model('Reward', RewardSchema);