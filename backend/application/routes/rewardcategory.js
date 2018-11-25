var routes =
[
	{
		url: '/rewardcategory/get/:id',
		method: 'GET',
		authentication: true,
		userLevels: ['user','admin'],
		function: getRewardCategoryById
	},
	{

		url: '/rewardcategory/delete/:id',
		method: 'DELETE',
		authentication: true,
		userLevels: ['admin'],
		function: deleteRewardCategoryById
	}, 
	{
		url: '/rewardcategory/update/',
		method: 'PATCH',
		authentication: true,
		userLevels: ['admin'],
		function: updateRewardCategoryById
	},
	{
		url: '/rewardcategory/all/',
		method: 'GET',
		authentication: true,
		userLevels: ['user', 'admin'],
		function: getAllRewardCategorys
	},
	{
		url: '/rewardcategory/create',
		method: 'PUT',
		authentication: true,
		userLevels: ['admin'],
		function: createRewardCategory
	}
]

exports.get = function()
{
	return routes;
}

async function getRewardCategoryById(req, res)
{
	var database = res.locals.database;
	var rewardcategoryid = req.params.id;

	var rewardcategory = await database.findOne('RewardCategory', {_id: rewardcategoryid})


	res.json(rewardcategory);
}

async function deleteRewardCategoryById(req, res)
{
	console.log('deleting rewardcategory: ', rewardcategoryid);

	var database = res.locals.database;
	var rewardcategoryid = req.params.id;



	if(!rewardcategoryid)
		res.json({error: "invalid-rewardcategoryid"});

	var rewardcategory = await database.deleteOne('RewardCategory', {_id: rewardcategoryid});
	res.json({succes:true});	
}

async function updateRewardCategoryById(req, res)
{
	var database = res.locals.database;
	var rewardcategoryid = req.body.id || req.body._id;

	var fields = {};


	if(req.body.name)
		fields.categoryName = req.body.name;


	var rewardcategory = await database.updateOne('RewardCategory', 
		{_id: rewardcategoryid}, //search 
		fields) //fields;

	res.json({succes: true});
}



async function getAllRewardCategorys(req, res)
{
	var database = res.locals.database;

	var rewardcategorys = await database.findMany('RewardCategory', {});

	res.json(rewardcategorys);
}


async function createRewardCategory(req, res)
{
	var database = res.locals.database;

	var fields = {}

	if(req.body.name)
		fields.categoryName = req.body.name;




	var result = await database.createOne('RewardCategory', fields);

	res.json({succes: true});
}





