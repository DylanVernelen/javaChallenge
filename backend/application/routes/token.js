	var bcrypt  = require('bcrypt');


var routes =
[
	{
		url: '/token/validate/',
		method: 'POST',
		authentication: false,
		function: validateToken
	}
]

exports.get = function()
{
	return routes;
}

async function validateToken(req, res)
{
	var database = res.locals.database;
	var email = req.body.email || undefined;
	var password = req.body.password || undefined;



	var user = await database.findOne('User', {email: email});

	if(!user || !password || password.trim() == '')
	{
		res.json({error: "invalid-login"});
		return;
	}



	var index = 0;

	if(user.challenges)
		for(let i = 0; i < user.challenges.length; i++)
		{	

			var challenge = await database.findOne('Challenge', {_id: user.challenges[i].challengeid});


			let name = 'not found';
			let worth = 0;

			if(challenge && challenge.challengeName && challenge.challengeWorth)
			{
				name = challenge.challengeName;
				worth = challenge.challengeWorth;
			} 



			user.challenges[i].challengeName = name;
			user.challenges[i].challengeWorth = worth;

		}

	if(user.history)
		for(let i = 0; i < user.history.length; i++)
		{	

			let reward = await database.findOne('Reward', {_id: user.history[i].rewardid});

			let name = 'not found';
			let worth = 0;
			let description = '';

			if(reward && reward.name && reward.worth)
			{
				name = reward.name;
				worth = reward.worth;
				description = reward.description;
			} 

			user.history[i].description = description;
			user.history[i].name = name;
			user.history[i].worth = worth

		}
	

	if(bcrypt.compareSync(password, user.password))
		res.json({
			id: user._id,
			token: user.token,
			pointCount: user.pointCount,
			email: user.email,
			userLevel: user.userLevel,
			history: (user.history || {}),
			challenges: (user.challenges || {})

		});
	else
		res.json({error: "invalid-login"});

}
