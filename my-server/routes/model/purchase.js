var mongoose = require("mongoose");
var Purchase = new mongoose.Schema({
  InvestorName: { type: String },
  InvestorMail: { type: String },
  Phone: { type: String },
  Topic: { type: String },
  Category: { type: String },
  Description: { type: String },
  price: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  }
});
module.exports = mongoose.model("purchase", investorIdeas);
