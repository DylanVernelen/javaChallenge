var mongoose = require('mongoose');
var database = undefined;


var modelReward = require('./models/reward.js');
var modelChallenge = require('./models/challenge.js');
var modelUser = require('./models/user.js');
var modelRewardCategory = require('./models/rewardcategory.js');



class Database
{

	constructor(database)
	{
		console.log('Connecting to database...');
		this.database = mongoose.connect( 'mongodb://'+database.username+':'+database.password+'@'+database.host, {useNewUrlParser: true});
		console.log('Connected!');
	}
	 

	handle()
	{
		return this.database;
	}

	models()
	{

		return 
		{
			modelReward, 
			modelChallenge,
			modelUser,
			modelRewardCategory
		}
	}


	getModelByType(type)
	{
		if(type == 'Reward')
			return modelReward;
		else if(type == 'Challenge')
			return modelChallenge;
		else if(type == 'User')
			return modelUser;
		else if('RewardCategory');
			return modelRewardCategory;
	}


	async findOne(type, searchQuery)
	{
		try
		{
			var result = await this.getModelByType(type).findOne(searchQuery)
				.then( (result) =>
				{
					return result;
				})
				.catch( (err) => 
				{
        	    	return false;
        		});
			return result;
		}
		catch (err )
		{
			console.log(err);
			return false;
		}
	}

	async findMany(type, searchQuery)
	{
		try
		{
			var result = await this.getModelByType(type).find(searchQuery)
				.then( (result) =>
				{
					return result;
				})
				.catch( (err) => 
				{
        	    	return false;
        		});
			return result;
		}
		catch (err )
		{
			console.log(err);
			return false;
		}
	}

	async deleteOne(type, searchQuery)
	{

			console.log('deleting reward2');

		try
		{
			var result = await this.getModelByType(type).deleteOne(searchQuery)
				.then( (result) =>
				{
					return result;
				})
				.catch( (err) => 
				{
					return false;
				})
			return result;
		}
		catch(err)
		{
			console.log(err);
			return false;
		}
	}

	async createOne(type, createFields)
	{
		var model = this.getModelByType(type)
		try
		{
			var result = new model();


			for(var field in createFields)
			{
				var value = createFields[field];

				if(value != undefined)
					result[field] = value;
			}

			result.save(function(err)
			{
				if(err)
					console.log("Error:",err);

				return result;
			})

		} catch(err)
		{
			console.log('Error: ', err);
		}
	}

	async updateOne(type, searchQuery, updateFields)
	{

		try 
		{
			var result = await this.getModelByType(type).findOne(searchQuery)
				.then( (result) => 
				{
					
					
					return result;
				})
				.catch( (err) => 
				{		
					console.log(err);
					return false;
				})


			if(!result)
			{
				console.log('Could not find ' + type + ': ' + searchQuery);
				return false;
			}

			for(var field in updateFields)
			{
				var value = updateFields[field];

				if(value != undefined)
					result[field] = value;
			}

			result.save(function(err)
			{
				if(err)
					console.log("Error:",err);

				return result;
			})

		}
		catch(err)
		{
			console.log(err);
			return false;
		}

		return result;
	}
}
module.exports = Database;

