var mongoose = require("mongoose");
var chatBot = new mongoose.Schema({
  submit: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
});
module.exports = mongoose.model("chatBot", chatBot);
