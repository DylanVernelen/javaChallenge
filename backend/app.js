// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Database
var mongoose = require('mongoose');

var modelReward = require('./models/reward.js');



mongoose.connect('mongodb://root:ThomasMore1@ds055762.mlab.com:55762/rewardsystem', {useNewUrlParser: true}); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {
    // do logging
    console.log('API: routing new query');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    res.json({ message: 'iAdviseRewardSystem: main content' });   
});



var models = 
{
	modelReward
}


var apiRoutes = require('./api_routes.js');
apiRoutes.init(router, models);






// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Starting server on port: ' + port);
