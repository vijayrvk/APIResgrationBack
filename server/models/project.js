var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Object,
        required: true
    },
    endDate: {
        type: Object,
        required: true
    },
    billable: {
        type: Boolean,
        required: true
    },
    estimatedDays: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    baseURL: {
        type: String
    },
    users: {
        type: Array
    },
});


// Export the model
module.exports = mongoose.model('project', ProjectSchema);