"use strict"

var cors   = require('cors');

var Routes = require('./routes/routes').get();
var ROUTER;


class Router 
{
	constructor(express, config, database)
	{
		// set global
		ROUTER = this;

		this.express = express;
		this.router = require('express').Router();

		this.router.use(this.onRouterUse);
		this.database = database;
		this.registerServices();
	}


	get()
	{
		return this.router;
	}

	async onRouterUse(req, res, next)
	{

		console.log("Routing new query: ", req.url);


		res.locals.user = await ROUTER.checkValidToken(req.query.token);
		res.locals.database = ROUTER.database;


		next();
	}

	async checkValidToken(token)
	{	
		if(!token)
			return false;
		

		try
		{
			var user = await this.database.findOne('User', {token: token});

			return (user.token) ? user : false;

		}
		catch(err)
		{

		}
		
	}


	registerServices()
	{
		var router = this.router;
		var express = this.express;
		var ROUTER  = this;

		this.routes = Routes;

		
		this.routes.forEach(function(type)
		{
			type.forEach(function(route)
			{

				console.log('Binding: ', route.method, ' - ', route.url);




				if(route.method == 'GET')
					router.get(route.url,  ROUTER.isAllowed, route.function);
				else if (route.method == 'POST')
					router.post(route.url, ROUTER.isAllowed,  route.function);
				else if (route.method == 'DELETE')
					router.delete(route.url, ROUTER.isAllowed, route.function);
				else if(route.method == 'PATCH')
					router.patch(route.url, ROUTER.isAllowed, route.function);
				else if(route.method == 'PUT')
					router.put(route.url, ROUTER.isAllowed, route.function);
			})
		})
	}


	isAllowed(req, res, next)
	{	



		var allowed = false;


		var USER = res.locals.user

		ROUTER.routes.forEach(function(type){ // Voor elk tpye
			type.forEach(function(route) // Voor elke route
			{
				if(route.url == req.route.path  && !allowed) // Kijken of het pad hetzelfde is als de query
				{

					//console.log('Attempting access. Requires: auth=' + route.authentication, 'userlevel=', route.userLevels, '--> user is=', USER.userLevel);

					if(!route.authentication) // Indien geen authenticatie vereist is, mag iedereen eraan
						allowed = true 
					else 
					{
						if(USER && USER.userLevel) // Indien USER en userlevel ingevuld zijn
							if(route.userLevels.indexOf(USER.userLevel) != -1) // Kijken of zijn rang in de toegelaten lijst is, zo ja: allowed --> true
								allowed = true;
						
					}
				}
				
			});
		
		});


		if(allowed) // Toegang
			return next()
		
		else  // Geen toegang
			res.send({error: 'no-permission'})

	}





}

module.exports = Router;



/*

module.exports =
{



	init: function()
	{
		router.all('*', cors());


		router.use(module.exports.onRouterUse);



		return router;
	},



	// Elke keer opgeroepen als eerste wanneer een pad opgevragen wordt
	onRouterUse: function(req, res, next)
	{
		console.log("Routing new query: ", req.url);
		module.exports.sendHeaders(res);




		next();

	},



	sendHeaders: function(res)
	{
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

	}
}
*/