var express    		= require('express');        // call express
var bodyParser 		= require('body-parser');
var router 			= require('./router');
var database 		= require('./database/database');
var cors 	   		= require('cors');





class Application
{
	constructor(config)
	{	
		this.database = new database(config.database)
		this.config = config;


		this.initializeExpress();
	}


	initializeExpress()
	{	


		this.express = express();
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(bodyParser.json());
		
		this.router = new router(this.express, this.config, this.database)

		this.express.use(this.config.router.path, this.router.get() );
		this.express.use(cors());
		this.express.options('*', cors());

		this.listen();
	}

	listen()
	{
		var port = this.config.application.port;

		this.express.listen(port);
	}


}


module.exports = Application;

