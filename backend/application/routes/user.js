var bcrypt = require('bcrypt');

var routes =
[
	{
		url: '/user/get/:id',
		method: 'GET',
		authentication: true,
		userLevels: ['admin', 'user'],
		function: getUserById
	},
	{

		url: '/user/delete/:id',
		method: 'DELETE',
		authentication: true,
		userLevels: ['admin'],
		function: deleteUserById
	}, 
	{
		url: '/user/update/',
		method: 'PATCH',
		authentication: true,
		userLevels: ['admin'],
		function: updateUserById
	},
	{
		url: '/user/all/',
		method: 'GET',
		authentication: true,
		userLevels: ['admin'],
		function: getAllUsers
	},
	{
		url: '/user/create',
		method: 'PUT',
		authentication: true,
		userLevels: ['admin'],
		function: createUser
	}
]

exports.get = function()
{
	return routes;
}

async function getUserById(req, res)
{
	var database = res.locals.database;
	var userid = req.params.id;

	var user = await database.findOne('User', {_id: userid});
	res.json(user);
}

async function deleteUserById(req, res)
{
	var database = res.locals.database;
	var userid = req.params.id;



	if(!userid)
		res.json({error: "invalid-userid"});

	var user = await database.deleteOne('User', {_id: userid});
	res.json({succes:true});	
}

async function updateUserById(req, res)
{
	var database = res.locals.database;
	var userid = req.body._id;

	var fields = {};


	if(!userid)
		res.json({error: "invalid-id"});
	if(req.body.email)
	{
		fields.email = req.body.email;
	}

	if(req.body.password)
	{
		fields.password = bcrypt.hashSync(req.body.password, 10);
	}

	if(req.body.userLevel)
	{
		fields.userLevel = req.body.userLevel;
	}

	if(req.pointCount)
	{
		fields.pointCount = req.body.pointCount;
	}



	var user = await database.updateOne('User', 
		{_id: userid}, //search 
		fields) //fields;

	res.json({succes: true});
}



async function getAllUsers(req, res)
{
	var database = res.locals.database;

	var users = await database.findMany('User', {});

	res.json(users);
}


async function createUser(req, res)
{
	var database = res.locals.database;

	var fields = {}

	if(!req.body.password)
	{
		res.json({error: "no-password"})
		return;
	}


	if(!req.body.email)
	{
		res.json({error: "no-email"})
		return;
	}

	if(!req.body.userLevel)
	{
		res.json({error: "no-userlevel"})
		return;
	}

	var timestamp = Math.floor(new Date() / 1000);

	fields.token = bcrypt.hashSync(timestamp.toString(), 10).replace(/[^0-9a-z]/gi, '');
	fields.password = bcrypt.hashSync(req.body.password, 10);
	fields.email = req.body.email;
	fields.userLevel = req.body.userLevel;
	fields.pointCount = req.body.pointCount || 0;


	var result = await database.findOne('User', {email: fields.email});

	if(result)
	{
		res.json({error: "email-duplication"});
		return;
	}

	var result = await database.createOne('User', fields);


	res.json({succes: true});

}





