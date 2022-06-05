var mongoose = require("mongoose");
var investorIdeas = new mongoose.Schema({
  topic: { type: String },
  category: { type: String },
  description: { type: String },
  price: { type: String },
  userName: { type: String },
  userPhone: { type: String },
  userEmail: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});
module.exports = mongoose.model("investorIdeas", investorIdeas);
