var express = require('express');
var router = express.Router();
const authSchema = require('../util/authSchema')
const validator = require('express-joi-validation').createValidator({
    passError: true
})

// Require the controllers WHICH WE DID NOT CREATE YET!!
var authController = require('../controllers/authController');

router.post('/login', validator.body(authSchema.loginSchema), authController.loginValidation);

module.exports = router;