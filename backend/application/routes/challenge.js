var routes =
[
	{
		url: '/challenge/get/:id',
		method: 'GET',
		authentication: true,
		userLevels: ['user','admin'],
		function: getChallengeById
	},
	{

		url: '/challenge/delete/:id',
		method: 'DELETE',
		authentication: true,
		userLevels: ['admin'],
		function: deleteChallengeById
	}, 
	{
		url: '/challenge/update/',
		method: 'PATCH',
		authentication: true,
		userLevels: ['admin'],
		function: updateChallengeById
	},
	{
		url: '/challenge/all/',
		method: 'GET',
		authentication: true,
		userLevels: ['user', 'admin'],
		function: getAllChallenges
	},
	{
		url: '/challenge/request',
		method: 'POST',
		authentication: true,
		userLevels: ['user', 'admin'],
		function: requestChallengeById
	},
	{
		url: '/challenge/completed',
		method: 'POST',
		authentication: true,
		userLevels: ['admin'],
		function: onChallengeComplete
	},
    {
        url: '/challenge/create',
        method: 'POST',
        authentication: true,
        userLevels: ['admin'],
        function: createChallenge
    },
	{
		url: '/challenge/rejected',
		method: 'POST',
		authentication: true,
		userLevels: ['admin'],
		function: onChallengeRejected
	},
]

exports.get = function()
{
	return routes;
}

async function getChallengeById(req, res)
{
	var database = res.locals.database;
	var challengeid = req.params.id ;

	var challenge = await database.findOne('Challenge', {_id: challengeid})


	res.json(challenge);
}

async function deleteChallengeById(req, res)
{

	var database = res.locals.database;
	var challengeid = req.params.id;



	if(!challengeid)
		res.json({error: "invalid-id"});

	var challenge = await database.deleteOne('Challenge', {_id: challengeid});
	res.json({succes:true});	
}

async function updateChallengeById(req, res)
{
	var database = res.locals.database;
	var challengeid = req.body.id || req.body._id;

	var fields = {};


	if(req.body.name || req.body.challengeName)
		fields.challengeName = req.body.name || req.body.challengeName;

	if(req.body.worth || req.body.challengeWorth)
		fields.challengeWorth = req.body.worth || req.body.challengeWorth;;

	if(req.body.owner || req.body.challengeOwner)
		fields.challengeOwner = req.body.owner || req.body.challengeOwner;;


	if(!challengeid)
		res.json({error: "invalid-challengeid"});


	var challenge = await database.updateOne('Challenge', 
		{_id: challengeid}, //search 
		fields) //fields;

	res.json({succes: true});
}



async function getAllChallenges(req, res)
{
	var database = res.locals.database;

	var challenges = await database.findMany('Challenge', {});

	res.json(challenges);
}




async function createChallenge(req, res)
{
	var database = res.locals.database;

	var fields = {};

	
	if(req.body.name)
		fields.challengeName = req.body.name;

	if(req.body.worth)
		fields.challengeWorth = req.body.worth;

	if(req.body.owner)
		fields.challengeOwner = req.body.owner;



	var result = await database.createOne('Challenge', fields);
}






async function requestChallengeById(req, res)
{
	var database = res.locals.database;

	var challenge = await database.findOne('Challenge', {_id: (req.body.id || req.body._id || undefined)});

	var description = undefined;
	if(req.body.description)
		description = req.body.description;


	if(!challenge)
	{
		res.json({error: "invalid-challengeid"});
		return;
	}


	var user = res.locals.user;

	if(!user)
	{
		res.json({error: "invalid-userid"});
		return;
	}	

	var uniqueid = Math.random().toString(36).substr(2, 20);
	console.log('Requesting challenge with id: ', challenge._id);
	user.challenges.push(
	{
		challengeid: challenge._id,
		timestampAdded: Math.floor(new Date() / 1000),
		timestampCompleted: undefined,
		challengeStatus: 'pending',
		pointsAwarded: undefined,
		uniqueid: uniqueid,
		description: description
	});


	user.save(function(err)
	{
		if(err)
			console.log(err);
	})
	res.json(
		user.challenges[user.challenges.length - 1]
	)

}
async function onChallengeRejected(req, res)
{
	var database  = res.locals.database;
	var userid = req.body.userid || undefined;
	var uniqueid = req.body.uniqueid || undefined;
	var user = await database.findOne('User', {_id: userid});

	if(!user)
	{
		return res.json({error: 'invalid-userid'});
	}

	var found = false;
	 

	user.challenges.forEach(function(challenge)
	{
		if(challenge.uniqueid = uniqueid)
			found = challenge;
	});

	if(!found)
	{
		return res.json({error: 'invalid-uniqueid'});
	}

	if(found.pointsAwarded && found.pointsAwarded > 0)
	{
		return res.json({error: 'already-completed'})
	}

	if(found.challengeStatus == 'finished')
	{
		return res.json({error: 'already-completed'})
	}
	if(found.challengeStatus == 'rejected')
	{
		return res.json({error: 'already-rejected'})
	}




	found.challengeStatus = 'rejected';
	var challenge = await database.findOne('Challenge', {_id: found.challengeid});

	if(!challenge)
	{
		return res.json({error: 'invalid-challenge-id-does-not-exist'});
	}

	found.pointsAwarded = 0;

	//found.pointsAwarded = challenge.challengeWorth;

	//user.pointCount += found.pointsAwarded;



	user.save(function(err)
	{
		if(err)
			console.log(err);
	})

	res.json({succes: true, pointsAwarded: found.pointsAwarded, pointCount: user.pointCount});

}

async function onChallengeComplete(req, res)
{
	var database  = res.locals.database;
	var userid = req.body.userid || undefined;
	var uniqueid = req.body.uniqueid || undefined;
	var user = await database.findOne('User', {_id: userid});

	if(!user)
	{
		return res.json({error: 'invalid-userid'});
	}

	var found = false;
	

	user.challenges.forEach(function(challenge)
	{
		if(challenge.uniqueid = uniqueid)
			found = challenge;
	});

	if(!found)
	{
		return res.json({error: 'invalid-uniqueid'});
	}

	if(found.pointsAwarded && found.pointsAwarded > 0)
	{
		return res.json({error: 'already-completed'})
	}

	if(found.challengeStatus == 'finished')
	{
		return res.json({error: 'already-completed'})
	}
	if(found.challengeStatus == 'rejected')
	{
		return res.json({error: 'already-rejected'})
	}


	found.challengeStatus = 'finished';
	var challenge = await database.findOne('Challenge', {_id: found.challengeid});

	if(!challenge)
	{
		return res.json({error: 'invalid-challenge-id-does-not-exist'});
	}


	found.pointsAwarded = challenge.challengeWorth;

	user.pointCount += found.pointsAwarded;



	user.save(function(err)
	{
		if(err)
			console.log(err);
	})

	res.json({succes: true, pointsAwarded: found.pointsAwarded, pointCount: user.pointCount});

}

// challenge id 5bf3fe8f71feae0ff09907f9
// uid eea3yt4lxv