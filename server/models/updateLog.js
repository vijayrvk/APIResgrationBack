var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UpdateLogSchema = new Schema({
    userId: {
        type: String
    },
    collectionName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Export the model
module.exports = mongoose.model('updateLog', UpdateLogSchema);