var UpdateLog = require('../models/updateLog');


const updateLog = {
    createUpdateLog: function (data, cb) {
        UpdateLog.create(data, function (err, logCreated) {
            console.log(err)
            if (!err) {
                cb(logCreated)
            }
        });
    }
}

module.exports = updateLog;