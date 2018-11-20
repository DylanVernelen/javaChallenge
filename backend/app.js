// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bcrypt     = require('bcrypt');

// Database
var mongoose = require('mongoose');

var modelReward = require('./models/reward.js');
var modelChallenge = require('./models/challenge.js');
var modelUser = require('./models/user.js');
var modelRewardCategory = require('./models/rewardcategory.js');


mongoose.connect('mongodb://root:ThomasMore1@ds055762.mlab.com:55762/rewardsystem', {useNewUrlParser: true}); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var authentication = require('./authentication');
	




var models = 
{
    modelReward,
    modelChallenge,
    modelUser,
    modelRewardCategory
}


var apiRoutes = require('./api_routes.js');


router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept");

    console.log('API: routing new query: ' + req.url);

    var token = req.query.token;
 
    res.locals.token = token;

    console.log("Token: " , token);

    if(req.url == "/token/validate" || req.url == "/token/validate/")
    {
    	next();
    } else if(!token)
	{
		res.json({error: "no-token"});
		return;
	} else 
	{
		authentication.isValidToken(res, token, function(user){next();});   
	}

});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'iAdviseRewardSystem: main content' });   
});



apiRoutes.init(router, models);






// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Starting server on port: ' + port);
