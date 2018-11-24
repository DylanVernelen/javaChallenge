// BASE SETUP
// =============================================================================

// call the packages we need
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


