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
			user.challenges[i].challengeName = challenge.challengeName;
			user.challenges[i].challengeWorth = challenge.challengeWorth;

		}

	
	console.log(user.challenges);

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
