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


	if(bcrypt.compareSync(password, user.password))
		res.json({
			id: user._id,
			token: user.token,
			pointCount: user.pointCount,
			email: user.email,
			userLevel: user.userLevel,
			history: (user.history || {})

		});
	else
		res.json({error: "invalid-login"});

}
