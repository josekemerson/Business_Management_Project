var mongoose = require("mongoose");
var PatentIdeas = new mongoose.Schema({
  classification: { type: String },
  date: { type: String },
  priority_data: { type: String },
  applicant: { type: String },
  inventor: { type: String },
  title: { type: String },
  abstract: { type: String },
  price: {type: Number},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  price_expiry:{ type: String },
  // img:{ type: String },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
});
module.exports = mongoose.model("PatentIdeas", PatentIdeas);
