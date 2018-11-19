#!/usr/bin/env node
// ^ Nodig voor LINUX 

// more routes for our API will happen here


module.exports = 
{

	isValidToken: function(res, token, callback)
	{	
		var modelUser = require('./models/user.js');

		var result = false;
		
		modelUser.findOne({token: token}).then(user => 
		{

		    if (user._id) // if valid user id
		    	callback(user);
		    
		}).catch(error => {
		   res.json({error: "invalid-token"});
		});


		
	},

	// Require user & pass
	getToken: function(res, email, password, callback)
	{

		modelUser.findOne({email: email, password: password}).then(user => 
		{
			if(user._id)
			{
				console.log("Geldige login", email, password);
			}
		})




		
	}


}

