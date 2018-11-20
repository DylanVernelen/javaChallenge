// app/models/rewardcategory.js


var mongoose = require('mongoose');
var Schema = mongoose.Schema


var RewardCategorySchema = new Schema(
{
	categoryName: String
	

});



module.exports = mongoose.model('rewardcategory', RewardCategorySchema, "rewardcategorys");