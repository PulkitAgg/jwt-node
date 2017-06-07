//import the required modules
var express = require('express');
var router = express.Router();
var appController = require('../controllers/appController');

//API for users

//api for posting/add  the data of user
router.route('/setup')
  .post(appController.postUser);

router.route('/')
  .get(appController.randommsg);

router.route('/users')
  .get(appController.getAll);

router.route('/authenticate')
  .post(appController.auth);


//export the router
module.exports = router;
