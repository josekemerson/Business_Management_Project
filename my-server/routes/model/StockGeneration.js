var mongoose = require("mongoose");
var StockGeneration = new mongoose.Schema({
  comapanyName: { type: String },
  date: { type: Array },
  stockPrice: { type: Array },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});
module.exports = mongoose.model("StockGeneration", StockGeneration);
