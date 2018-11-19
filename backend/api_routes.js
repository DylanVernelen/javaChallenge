#!/usr/bin/env node
// ^ Nodig voor LINUX 

// more routes for our API will happen here


module.exports = 
{
	init: function(router, models)
	{

		// REWARD CREATE - POST
		router.route('/reward/create').post(function(req, res)
		{
			var reward = new models.modelReward();

			reward.rewardName = req.body.name;
			reward.rewardOwner = req.body.owner;
			reward.rewardWorth = req.body.worth;
			reward.enabled = req.body.enabled;
			reward.description = req.body.description;


			reward.save(function(err)
			{
				if(err)
					res.send(err);
				
				res.json({succes: true});
			})
		});


		// REWARD GET BY ID - GET 
		router.route('/reward/get/:reward_id').get(function(req, res)
		{	
			var model = models.modelReward;

			model.findById(req.params.reward_id, function(err, reward)
			{
				if(err)
					res.send(err)

				res.json(reward);
			})
		});

		// REWARD DELETE BY ID - DELETE
		router.route('/reward/delete/:reward_id').delete(function(req, res)
		{
			var model = models.modelReward;

			model.remove({
				_id: req.params.reward_id
			}, function(err, reward)
			{
				if(err)
					res.send(err);

				res.json({succes: true});
			});
		});

		// GET ALL REWARDS - GET
		router.route('/reward/all').get(function(req, res)
		{
			var model = models.modelReward;
			model.find({}, function(err, rewards)
			{
				res.json(rewards);
			})
		});

		// USER CREATE - POST
		router.route('/user/create').post(function(req, res)
		{
			var user = new models.modelUser();

			user.email = req.body.email;
			user.password = req.body.password;
			user.userLevel = req.body.userLevel;
			user.pointCount = req.body.pointCount;


			reward.save(function(err)
			{
				if(err)
					res.send(err);
				
				res.json({succes: true});
			})
		});

		// USER GET BY ID - GET 
		router.route('/user/get/:user_id').get(function(req, res)
		{	
			var model = models.modelUser;

			model.findById(req.params.reward_id, function(err, user)
			{
				if(err)
					res.send(err)

				res.json(user);
			})
		});

		// USER DELETE BY ID - DELETE
		router.route('/user/delete/:user_id').delete(function(req, res)
		{
			var model = models.modelUser;

			model.remove({
				_id: req.params.user_id
			}, function(err, reward)
			{
				if(err)
					res.send(err);

				res.json({succes: true});
			});
		});

		// GET ALL USERS - GET
		router.route('/user/all').get(function(req, res)
		{
			var model = models.modelUser;
			model.find({}, function(err, user)
			{
				res.json(user);
			})
		});

		// CHALLENGE CREATE - POST
		router.route('/challenge/create').post(function(req, res)
		{
			var challenge = new models.modelChallenge();

			challenge.challengeName = req.body.challengeName;
			challenge.challengeOwner = req.body.challengeOwner;
			challenge.challengeWorth = req.body.challengeWorth;

			reward.save(function(err)
			{
				if(err)
					res.send(err);
				
				res.json({succes: true});
			})
		});

		// CHALLENGE GET BY ID - GET 
		router.route('/challenge/get/:challenge_id').get(function(req, res)
		{	
			var model = models.modelChallenge;

			model.findById(req.params.reward_id, function(err, challenge)
			{
				if(err)
					res.send(err)

				res.json(challenge);
			})
		});

		// CHALLENGE DELETE BY ID - DELETE
		router.route('/challenge/delete/:challenge_id').delete(function(req, res)
		{
			var model = models.modelChallenge;

			model.remove({
				_id: req.params.user_id
			}, function(err, challenge)
			{
				if(err)
					res.send(err);

				res.json({succes: true});
			});
		});

		// GET ALL CHALLENGES - GET
		router.route('/challenge/all').get(function(req, res)
		{
			var model = models.modelChallenge;
			model.find({}, function(err, challenge)
			{
				res.json(challenge);
			})
		});

	}


}

