var mongoose = require("mongoose");
var appointmentSchema = new mongoose.Schema({
  AppointName: {
    type: String,
  },
  AppointPhone: {
    type: Number,
  },
  AppointAdvisorId: {
    type: String,
  },
  AppointDate: {
    type: String,
  },
  AppointTime: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["active", "canceled"],
    default: "active",
  },
  
});
module.exports = mongoose.model("appointments", appointmentSchema);
