var mongoose = require("mongoose");

const conn = require("../dbconfig/dbconnection");

var otpSchema = new mongoose.Schema({
  uname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
  expireIn: {
     type:  Number
  },
  timestamps: true
})

let otp = conn.model("otp",otpSchema )

