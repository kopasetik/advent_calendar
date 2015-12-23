var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiSchema = new Schema({
  name: String,
  description: String,
  url: String
});

module.exports = mongoose.model('Api', ApiSchema);
