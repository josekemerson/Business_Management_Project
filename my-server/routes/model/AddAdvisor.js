var mongoose = require("mongoose");
var addadvisorsSchema = new mongoose.Schema({
  AdvisorName: {
    type: String,
  },
  AdvisorPhone: {
    type: Number,
  },
 AdvisorEmail: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "canceled"],
    default: "active",
  },
});
module.exports = mongoose.model("advisors", addadvisorsSchema);