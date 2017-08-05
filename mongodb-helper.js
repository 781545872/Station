var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/station');

module.exports = mongoose;