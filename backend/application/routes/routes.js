var reward 		= require("./reward").get();
var token  		= require("./token" ).get();
var user   		= require("./user"  ).get();
var challenge   = require("./challenge"  ).get();
var rewardcategory   = require("./rewardcategory"  ).get();
exports.get = function()
{
	return [
		reward,
		token,
		user,
		challenge,
		rewardcategory
	];		
}



//module.export = []
