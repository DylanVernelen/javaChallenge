// BASE SETUP
// =============================================================================

// call the packages we need
var bcrypt     = require('bcrypt');
var application = require('./application/application');


var config = 
{
    database:
    {
        username: 'root',
        password: 'ThomasMore1',
        host: 'ds055762.mlab.com:55762/rewardsystem'
    },
    router: 
    {
        path: '/api',

    },

    application: 
    {
        port: 8080
        
    }


}



var app =  new application(config);




/*

    




// ROUTES FOR OUR API
// =============================================================================

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
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    console.log('API: routing new query: ' + req.url);

    res.locals.token = req.query.token;


    if(req.url == "/token/validate" || req.url == "/token/validate/")
    {
    	next();
    } else if(!res.locals.token)
	{
		res.json({error: "no-token"});
		return;
	} else 
	{
		authentication.isValidToken(res, res.locals.token, function(user){next();});   
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
*/