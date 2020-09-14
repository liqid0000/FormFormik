var mongoose = require('mongoose');
var bioSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateEvent: {
        type: String,
        required: true
    },       
    created_at: {
        type: Date,
        default: Date.now
    }
});
var Bio = module.exports = mongoose.model('bio', bioSchema);
module.exports.get = function (callback, limit) {
   Bio.find(callback).limit(limit); 
}