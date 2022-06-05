var mongoose = require("mongoose");
var leaveSchema = new mongoose.Schema({
  AdvisorId: {
    type: String,
  },
  LeaveReason: {
    type: String,
  },
  LeaveDate: {
    type: String,
  },
});
module.exports = mongoose.model("leave", leaveSchema);
