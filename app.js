// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJWT = require('express-jwt');

// Connect to the MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/JWTExampleDb');

// Create Express application
var app = module.exports = express();

var NODE_ENV = 'development';
//Set Variables
app.set('env', process.env.NODE_ENV || 'production');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('superSecret', "MyOwnSecretKey"); // secret variable

routes = require('./routes/routes');

app.use(expressJWT({secret:'MyOwnSecretKey'}).unless({path:['/api/','/api/authenticate']}));

app.use('/api', routes);// route middleware to verify a token

// routes.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'] ;
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).json({
//         success: false,
//         message: 'No token provided.'
//     });
//
//   }
// });




// Use environment defined port or 3000
var port = process.env.PORT || 8888;

// Start the server
app.listen(port);
console.log('Server starts on port ' + port);
