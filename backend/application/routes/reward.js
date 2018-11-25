var formidable = require('formidable');
var fs = require('fs');
var path = require('path')

var routes =
[
	{
		url: '/reward/get/:id',
		method: 'GET',
		authentication: true,
		userLevels: ['user','admin'],
		function: getRewardById
	},
	{

		url: '/reward/delete/:id',
		method: 'DELETE',
		authentication: true,
		userLevels: ['admin'],
		function: deleteRewardById
	}, 
	{
		url: '/reward/update/',
		method: 'PATCH',
		authentication: true,
		userLevels: ['admin'],
		function: updateRewardById
	},
	{
		url: '/reward/all/',
		method: 'GET',
		authentication: true,
		userLevels: ['user', 'admin'],
		function: getAllRewards
	},
	{
		url: '/reward/buy',
		method: 'POST',
		authentication: true,
		userLevels: ['user', 'admin'],
		function: buyRewardById
	},
	{
		url: '/reward/pickup',
		method: 'POST',
		authentication: true,
		userLevels: ['admin'],
		function: pickupRewardById
	},
	{
		url: '/reward/create',
		method: 'PUT',
		authentication: true,
		userLevels: ['admin'],
		function: createReward
	},
	{
		url: '/reward/fileupload/:reward_id',
		method: 'POST',
		authentication: true,
		userLevels: ['admin'],
		function: uploadFile
	}
]

exports.get = function()
{
	return routes;
}

async function getRewardById(req, res)
{
	var database = res.locals.database;
	var rewardid = req.params.id;

	var reward = await database.findOne('Reward', {_id: rewardid})

	console.log(reward);

	res.json(reward);
}

async function deleteRewardById(req, res)
{
	console.log('deleting reward: ', rewardid);

	var database = res.locals.database;
	var rewardid = req.params.id;



	if(!rewardid)
		res.json({error: "invalid-rewardid"});

	var reward = await database.deleteOne('Reward', {_id: rewardid});
	res.json({succes:true});	
}

async function updateRewardById(req, res)
{
	var database = res.locals.database;
	var rewardid = req.body.id || req.body._id;

	var fields = {};


	if(req.body.name)
		fields.name = req.body.name;

	if(req.body.worth)
		fields.worth = req.body.worth;

	if(req.body.category)
		fields.category = req.body.category;

	if(req.body.description)
		fields.description = req.body.description;

	if(!rewardid)
		res.json({error: "invalid-rewardid"});

	console.log(fields);

	var reward = await database.updateOne('Reward', 
		{_id: rewardid}, //search 
		fields) //fields;

	res.json({succes: true});
}



async function getAllRewards(req, res)
{
	var database = res.locals.database;

	var rewards = await database.findMany('Reward', {});

	res.json(rewards);
}



async function buyRewardById(req, res)
{
	var database = res.locals.database;
	var rewardid = req.body.id || req.body._id || undefined;

	var user = res.locals.user;

	var reward = await database.findOne('Reward', {_id: rewardid});
	
	if(!reward)
	{
		res.json({error: 'no-rewardid'});
		return;
	}

	if(!user)
	{
		res.json({error: 'no-user'});
		return;
	}


	console.log(user.email, ' attempt to buy ', reward.name);


	if(user.pointCount < reward.worth)
	{
		res.json({error: 'not-enough-points', 'userPointCount':user.pointCount, 'rewardWorth':reward.worth});
		return;
	}


	var uniqueid = Math.random().toString(36).substr(2, 20);
	user.pointCount -= reward.worth;
	user.history.push(
	{
		rewardid: rewardid,
		pointsSpent: reward.worth,
		timestamp: Math.floor(new Date() / 1000),
		pickedup: false,
		uniqueid: uniqueid
	});

	var userUpdate = await database.updateOne('User', {_id: user._id}, user);


						
	res.json({
		succes:true,
		currentPoints: user.pointCount,
		uniqueid: uniqueid

	})
}

async function pickupRewardById(req, res)
{
	var database = res.locals.database;
	var uniqueid = req.body.uniqueid || undefined;
	var userid = req.body.userid || undefined;
	var pickedup = req.body.pickedup || undefined;

	if(!pickedup)
	{
		res.json({'error': 'pickedup-not-0-or-1'});
		return;
	}

	pickedup = (pickedup == '1') ? true : false;
	

	var user = await database.findOne('User', {_id: userid});

	if(!user || !userid)
	{
		res.json({error: 'invalid-userid'})
		return;
	}

	if(!user.history)
		user.history = {}


	var reward = undefined;
	user.history.forEach(function(purchase)
	{
		if(purchase.uniqueid == uniqueid)
		{
			reward = purchase;
			reward.pickedup = pickedup;
		}
			
	});


	if(!reward)
	{
		res.json({error: 'invalid-uniqueid'})
		return;
	}

	
	var result = await database.updateOne('User', {_id: userid}, user);

	res.json({succes: true, result: result.history});
}

async function createReward(req, res)
{
	var database = res.locals.database;

	var fields = {}

	if(req.body.name)
		fields.name = req.body.name;

	if(req.body.worth)
		fields.worth = req.body.worth;

	if(req.body.category)
		fields.category = req.body.category;

	if(req.body.description)
		fields.description = req.body.description;


	var result = await database.createOne('Reward', fields);

    res.json({succes: true});

}





async function uploadFile(req, res)
{
	var database = res.locals.database;


	console.log("File upload: post");
	var form = new formidable.IncomingForm();
	var filename = '';

    form.parse(req, async function (err, fields, files) {
    	console.log('File uploaded!');

    	if(!files.file)
    	{
    		return res.json({error: 'invalid-name-should-be-file'})
    	}
      	var oldpath = files.file.path;	
		filename = req.params.reward_id + path.extname(files.file.name);
		var newpath = './../../' + filename;

		console.log('rewardid', req.params.reward_id);
		console.log('extension', path.extname(files.file.name));
		console.log('oldpath', oldpath);
		console.log('newpath', newpath);

		fs.rename(oldpath, newpath, async function (err) {
	        if (err) throw err;




	        var reward = await database.findOne({_id: req.params.reward_id});

	        if(reward)
	        {
	        	reward.imgUrl = filename;
	        	reward.save(function(err) {
	                if (err)
            		{
	                    res.send(err);
                		console.log(err);
                		return;
            		}	

            		console.log("OKOKOK");

					res.json({succes: true, imgUrl: "https://nodejs.tomvdr.com/" + filename});
            	});
	        }
	    });

	});
        


   // res.json({error: true});
}