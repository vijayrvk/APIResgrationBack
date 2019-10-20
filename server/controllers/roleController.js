var Role = require('../models/roles');
const UpdateLog = require('../util/updateLog');

exports.createRole = function (req, res) {
    req.body.createdAt = new Date();
    Role.create(req.body, function (err, newRole) {
        if (!err) {
            res.send({
                success: true,
                data: newRole
            })
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getRoleCondition = function (req, res) {
    Role.find(req.body, function (err, allRole) {
        console.log(allRole)
        if (!err) {
            res.send({
                success: true,
                data: allRole
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getAllRole = function (req, res) {
    Role.find({
        createdBy: req.query.userId,
        tenantId: req.query.tenantId
    }, function (err, allRole) {
        if (!err) {
            res.send({
                success: true,
                data: allRole
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getRoleById = function (req, res) {
    Role.findById(req.params.id, function (err, role) {
        if (!err) {
            res.send({
                success: true,
                data: role
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}


exports.updateRoleDetails = function (req, res) {
    Role.updateOne({
        _id: req.body.id
    }, req.body, function (err, role) {
        if (!err) {
            let log = {};
            log.collectionName = 'roles';
            log.userId = req.body.userId;
            UpdateLog.createUpdateLog(log, function (dataUpdate) {
                res.send({
                    success: true,
                    data: role
                })
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.deleteRole = function (req, res) {
    Role.updateOne({
        _id: req.body.id
    }, {
        isActive: false
    }, function (err, role) {
        if (!err) {
            res.send({
                success: true,
                data: role
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}