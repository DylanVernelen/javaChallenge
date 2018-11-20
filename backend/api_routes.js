#!/usr/bin/env node
// ^ Nodig voor LINUX 

// more routes for our API will happen here
var authentication = require('./authentication');


module.exports = 
{
	init: function(router, models)
	{
		// AUTHENTICATION: GET TOKEN BY EMAIL & PASS - GET
		router.route('/token/validate').post(function(req, res)
		{
			var modelUser = models.modelUser;

			var email = req.body.email;
			var password = req.body.password;

			var bcrypt     = require('bcrypt');



			modelUser.findOne({email: email}).exec().then(user => 
			{
				console.log(user);
				if(user && user.token)
				{
					if(bcrypt.compareSync(password, user.password))
						res.json({
							token: user.token,
							pointCount: user.pointCount,
							history: (user.history || {}),
							email: user.email,
							userLevel: user.userLevel

						});
				} else 
				{
					res.json({error: "invalid-login"});
				}
				
			})


		});


		// REWARD BUY 
		router.route('/reward/buy/').post(function(req, res)
		{


			var userId = req.body.id;
			var rewardId = req.body.rewardid;


			console.log(res.locals.token);
			authentication.getUserInfo(res.locals.token, function(user)
			{
				models.modelReward.findById(rewardId, function(err, reward)
				{
					if(err)
						res.send(err);

					console.log(user.pointCount, reward.rewardWorth);


					if(user.pointCount < reward.rewardWorth)
					{
						res.json({error: "not-enough-points"});
						return;
					}


					user.pointCount -= reward.rewardWorth;
					user.history.push(
					{
						rewardId: rewardId,
						pointsSpent: reward.rewardWorth,
						timestamp: Math.floor(new Date() / 1000)
					});

					user.save(function(err) {
		                if (err)
		                    res.send(err);

						res.json({succes: true, newPoints: user.pointCount});
		            });

				})



			});



/*
			models.modelReward.findById(rewardId, function(err, reward)
			{
				if(err)
					res.send(err);



			});

			/*models.modelUser.findById(userId, function(err, user)
			{
				if(err)
					res.send(err);



			})*/


		});


		// REWARD UPDATE - PATCH
		router.route('/reward/update').put(function(req, res)
		{
			var id = req.body.id;

			if(!id) 
			{
				res.json({error: "no-id"});
			}

			var name = req.body.name || undefined;
			var worth = parseInt(req.body.worth) || undefined;
			var owner = req.body.owner || undefined;
			var enabled = req.body.enabled || undefined;
			var description = req.body.description || undefined;

			
	        models.modelReward.findById(id, function(err, reward) {

	            if (err)
	                res.send(err);

	            if(name)
					reward.rewardName = name;

				if(owner)
					reward.rewardOwner = owner;

				if(worth)
					reward.rewardWorth = worth;

				if(enabled)
					reward.enabled = enabled;

				if(description)
					reward.description = description;

	            reward.save(function(err) {
	                if (err)
	                    res.send(err);

	                console.log(name);
					res.json({succes: true});
	            });
	        });
		});
		
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
			var user = models.modelUser;
			var bcrypt     = require('bcrypt');
			var timestamp = Math.floor(new Date() / 1000);

			user.email = req.body.email;
			user.password = bcrypt.hashSync(req.body.password, 10);
			user.userLevel = req.body.userLevel;
			user.pointCount = req.body.pointCount;


			user.token = bcrypt.hashSync(timestamp.toString(), 10);
			user.token = user.token.replace(/[^0-9a-z]/gi, '');



			models.modelUser.save(function(err)
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

