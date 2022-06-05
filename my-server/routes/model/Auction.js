var mongoose = require("mongoose");
var Auction = new mongoose.Schema({
  title: { type: String },
  price: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  price_expiry: { type: String},
  FinalPrice: { type: String },
  userName: {type: String},
  Price_status: {
    type: String,
    enum: ["selected", "not selected"],
    default: "not selected",
  },
});
module.exports = mongoose.model("Auction", Auction);
