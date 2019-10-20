const User = require('../models/users');
const UpdateLog = require('../util/updateLog');
const bcrypt = require('../util/bcrypt')

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.createUser = function (req, res) {
    User.findOne({
        $or: [{
            loginId: req.body.loginId
        }]
    }, function (err, userExist) {
        if (!userExist) {
            req.body.createdAt = new Date();
            req.body.password = bcrypt.encryptPassword(req.body.password);
            User.create(req.body, function (err, newUser) {
                console.log(err)
                if (!err) {
                    res.send({
                        success: true,
                        data: newUser
                    })
                } else {
                    res.send({
                        success: false,
                        message: "Something went wrong. Please try after sometime"
                    })
                }
            });
        } else {
            res.send({
                message: 'User Already exist'
            });
        }
    });

}

exports.getUserCondition = function (req, res) {
    if (req.body.password) {
        req.body.password = bcrypt.encryptPassword(req.body.password);
    }
    User.find(req.body, function (err, allUser) {
        console.log(allUser)
        if (!err) {
            res.send({
                success: true,
                data: allUser
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getAllUser = function (req, res) {
    User.find({}, function (err, allUser) {
        if (!err) {
            res.send({
                success: true,
                data: allUser
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getUserById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!err) {
            res.send({
                success: true,
                data: user
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}


exports.updateUserDetails = function (req, res) {
    if (req.body.edited) {
        req.body.password = bcrypt.encryptPassword(req.body.password);
    } else {
        delete req.body.password;
    }
    User.updateOne({
        _id: req.body.id
    }, req.body, function (err, user) {
        if (!err) {
            let log = {};
            log.collectionName = 'user';
            log.userId = req.body.userId;
            UpdateLog.createUpdateLog(log, function (dataUpdate) {
                res.send({
                    success: true,
                    data: user
                })
            });
        } else {
            console.log(err.code)
            if (err.code == 11000) {
                res.send({
                    success: false,
                    message: "loginId already exist"
                })
            } else {
                res.send({
                    success: false,
                    message: "Something went wrong. Please try after sometime"
                })
            }
        }
    });
}

exports.deleteUser = function (req, res) {
    User.updateOne({
        _id: req.body.id
    }, {
        isActive: false
    }, function (err, user) {
        if (!err) {
            res.send({
                success: true,
                data: user
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}