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

		router.route('/reward/all').get(function(req, res)
		{
			var model = models.modelReward;
			model.find({}, function(err, rewards)
			{
				res.json(rewards);
			})
		})

	}


}

