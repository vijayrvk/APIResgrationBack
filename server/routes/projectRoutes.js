var express = require('express');
var router = express.Router();
const projectSchema = require('../util/projectSchema');
const validator = require('express-joi-validation').createValidator({
    passError: true
})

// Require the controllers WHICH WE DID NOT CREATE YET!!
var projectController = require('../controllers/projectController');
var authController = require('../controllers/authController');

router.use(authController.validUserToken)

router.post('/createProject', validator.body(projectSchema.createProjectSchema), projectController.createProject);

router.get('/getAllProject', projectController.getAllProject);

router.post('/getProjectCondition', projectController.getProjectCondition);

router.get('/getProjectDetails/:id', validator.params(projectSchema.getProjectSchema), projectController.getProjectById);

router.post('/updateProjectDetails', validator.body(projectSchema.updateProjectSchema), projectController.updateProjectDetails);

router.post('/deleteProject', projectController.deleteProject);

router.post('/axiosCall', projectController.axiosCall);

module.exports = router;