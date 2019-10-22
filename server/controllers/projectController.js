const async = require('async');
const axios = require('axios');
const _ = require('lodash')
const Project = require('../models/project');
const UpdateLog = require('../util/updateLog');
const moment = require('moment')


exports.createProject = function (req, res) {
    req.body.createdAt = new Date();
    Project.find().or(
        [{
            name: new RegExp('^' + req.body.name + '$', "i")
        }]).then((project) => {
        console.log(project)
        if (project.length > 0) {
            res.send({
                success: false,
                message: "Project are already exists"
            })
        } else {
            Project.create(req.body, (err, newProject) => {
                console.log(err)
                if (!err) {
                    res.send({
                        success: true,
                        message: "Project created Successfully"
                    })
                } else {
                    res.send({
                        success: false,
                        message: "Something went wrong. Please try after sometime"
                    })
                }
            });
        }
    })
}

exports.getAllProject = function (req, res) {
    Project.find({}, function (err, allProjects) {
        if (!err) {
            res.send({
                success: true,
                data: allProjects
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.getProjectCondition = function (req, res) {
    Project.find(req.body.filter).limit(req.body.limit)
    .skip(req.body.limit * req.body.offset).exec((err, allProjects) => {
        if (!err) {
            Project.count({}, (err, count) =>{
                res.send({
                    success: true,
                    data: allProjects,
                    count: count
                });
            });              
            } else {
                res.send({
                    success: false,
                    message: "Something went wrong. Please try after sometime"
                })
            }
    })
}

exports.getProjectById = function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (!err) {
            res.send({
                success: true,
                data: project
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.updateProjectDetails = function (req, res) {
    Project.updateOne({
        _id: req.body.id
    }, req.body, function (err, project) {
        if (!err) {
            let log = {};
            log.collectionName = 'project';
            log.userId = req.body.userId;
            UpdateLog.createUpdateLog(log, function (dataUpdate) {

            });
            res.send({
                success: true,
                data: project
            })
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}

exports.deleteProject = function (req, res) {
    Project.updateOne({
        _id: req.body.id
    }, {
        isActive: false
    }, function (err, project) {
        if (!err) {
            res.send({
                success: true,
                data: project
            });
        } else {
            res.send({
                success: false,
                message: "Something went wrong. Please try after sometime"
            })
        }
    });
}


exports.axiosCall = function (req, res) {
    var headers = {};
    for (var i = 0; i < req.body.headers.length; i++) {
        if (req.body.headers[i].key) {
            headers[req.body.headers[i].key] = req.body.headers[i].value;
        }
    }
    var body = {};
    for (var i = 0; i < req.body.body.length; i++) {
        if (req.body.body[i].key) {
            body[req.body.body[i].key] = req.body.body[i].value;
        }

    }
    let config = {
        method: req.body.method,
        url: req.body.url,
        timeout: 5000
    }
    if (Object.keys(headers).length != 0) {
        config.headers = headers
    }
    if (Object.keys(body).length != 0) {
        config.data = body
    }
    axios(config).then(function (response) {
        res.send({
            success: true,
            data: response.data
        })
    }).catch(err => {
        console.log(err)
        res.send({
            success: true,
            data: err
        })
    });
}