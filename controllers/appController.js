var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.randommsg = function(req, res) {
  res.json({
    success: true,
    msg: 'Hello Random msg api is working'

  });
}

exports.getAll = function(req, res) {

  User.find({}, function(err, users) {
    res.json(users);
  });
}


// export the auth service.
exports.auth = function(req, res) {
  // find the user
  console.log("hi");
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "MyOwnSecretKey", {
          expiresIn: 2000000
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });

}


// export the postUser method
// This api take name, role and password in the body.
exports.postUser = function(req, res) {
  user_name = req.body.name;
  User_password = req.body.password;
  //console.log(req.headers['authorization']
  // creating the new user
  var user = new User({
    name: req.body.name,
    password: req.body.password,
    admin: true
  });
  //save the creating user
  user.save(function(error, response) {
    // handle the error
    if (error) {
      return error;
    } else {
      //send the response to the browser
      res.json({
        success: true,
        body: response
      }); // end of response.
    } //end of else.
  }); // end of save method
} // end of postUser method
