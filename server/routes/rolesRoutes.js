var express = require('express');
var router = express.Router();
const rolesSchema = require('../util/rolesSchema')
const validator = require('express-joi-validation').createValidator({
    passError: true
})

// Require the controllers WHICH WE DID NOT CREATE YET!!
var rolesController = require('../controllers/roleController');
var authController = require('../controllers/authController');

router.use(authController.validUserToken)

router.post('/createRoles', validator.body(rolesSchema.createRoleSchema), rolesController.createRole);

router.get('/getAllRole', rolesController.getAllRole);

router.get('/getRolesDetails/:id', validator.body(rolesSchema.getRoleSchema), rolesController.getRoleById);

router.post('/getRoleCondition', rolesController.getRoleCondition);

router.post('/updateRolesDetails', validator.body(rolesSchema.updateRoleSchema), rolesController.updateRoleDetails);

router.post('/deleteRoles', rolesController.deleteRole);

module.exports = router;