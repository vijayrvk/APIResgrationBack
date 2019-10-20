const User = require('../models/users');
const Role = require('../models/roles')
const bcrypt = require('../util/bcrypt');
const jwt = require('jsonwebtoken');
exports.loginValidation = function (req, res) {
    console.log(req.body)
    User.findOne({
        loginId: req.body.loginId
    }).then(function (user) {
        if (user) {
            let validatePassword = bcrypt.validatePassword(req.body.password, user.password);
            console.log(validatePassword)
            if (validatePassword) {
                var token = jwt.sign({
                    username: user.loginId,
                    userId: user._id
                }, 'secret', {
                    expiresIn: '10h'
                });

                Role.findOne({
                    _id: user.roleId
                }).then(function (role, err) {
                    if (!err) {
                        res.send({
                            success: true,
                            data: {
                                'token': token,
                                'userId': user._id.toString(),
                                'role': role,
                                'name': user.name,
                                'isAdmin': true,
                                'modules': user.modules
                            }
                        });

                    } else {
                        res.send({
                            success: false,
                            message: "Couldnot find role, Please contact admin"
                        })
                    }

                })
            } else {
                res.send({
                    success: false,
                    message: 'Invalide LoginId/Password'
                })
            }
        } else {
            res.send({
                success: false,
                message: 'User Not Found'
            })
        }
    });
}
exports.validUserToken = function (req, res, next) {
    var token = req.headers['x-auth-token'] || '';
    // next();
    if (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                User.findOne({
                    _id: decoded.userId
                }).then(function (validUser) {
                    if (!validUser) {
                        res.status(403).json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        next();
                    }
                });
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}