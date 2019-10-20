const express = require('express');
const router = express.Router();
const userSchema = require('../util/userSchema')
const validator = require('express-joi-validation').createValidator({
    passError: true
})

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', userController.test);

router.use(authController.validUserToken)

router.post('/createUser', userController.createUser);

router.get('/getAllUser', userController.getAllUser);

router.post('/getUserCondition', userController.getUserCondition);

router.get('/getUserDetails/:id', validator.params(userSchema.getUserSchema), userController.getUserById);

router.post('/updateUserDetails', validator.body(userSchema.updateUserSchema), userController.updateUserDetails);

router.post('/deleteUser', userController.deleteUser);

module.exports = router;