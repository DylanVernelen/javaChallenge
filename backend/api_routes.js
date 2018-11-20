#!/usr/bin/env node
// ^ Nodig voor LINUX 

// more routes for our API will happen here
var authentication = require('./authentication');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')


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
							email: user.email,
							userLevel: user.userLevel,
							history: (user.history || {})

						});
					else 
						res.json({error: "invalid-login"});

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
						timestamp: Math.floor(new Date() / 1000),
						opgehaald: false
					});

					user.save(function(err) {
		                if (err)
		                    res.send(err);

    					console.log("Gebruiker ", user.email, " heeft reward ", reward.rewardName, " gekocht voor ", reward.rewardWorth, " punten (Resterend: ", user.pointCount, ")");

						res.json({succes: true, newPoints: user.pointCount});
		            });
				})
			});
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
			var imgurl = req.body.imgurl || undefined;
			
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

				if(imgurl)
					reward.imgUrl = imgurl;

	            reward.save(function(err) {
	                if (err)
	                    res.send(err);

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
			reward.imgUrl = req.body.imgurl || undefined;


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


		// GET ALL CATEGORIES - GET 
		router.route('/category/all').get(function(req, res)
		{
			models.modelRewardCategory.find({}, function(err, rewards)
			{
				if(err)
				{
					res.json(err);
					console.log(err);
				}	

				res.json(rewards);
			})
		});


		router.route('/reward/fileupload/:reward_id').post(function(req, res)
		{
			console.log("File upload: post");
			var form = new formidable.IncomingForm();
			var filename = '';

		    form.parse(req, function (err, fields, files) {
		    	console.log('File uploaded!');

		      	var oldpath = files.file.path;
      			filename = req.params.reward_id + path.extname(files.file.name);
      			var newpath = './../' + filename;

      			console.log('rewardid', req.params.reward_id);
      			console.log('extension', path.extname(files.file.name));
      			console.log(oldpath, newpath);

  				fs.rename(oldpath, newpath, function (err) {
			        if (err) throw err;
			        
					res.json({succes: true, imgurl: "https://nodejs.tomvdr.com/" + filename});
					return;
		      	});
		    });

		   // res.json({error: true});
		});
	}


}

