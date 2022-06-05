var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var userSchema = new mongoose.Schema({
  uname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  leave: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "investor", "business", "advisor"],
    default: "investor",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

userSchema.pre("save", function(next) {
  var user = this;
  var SALT_FACTOR = 10; // 12 or more for better security

  if (!user.isModified("password")) return next();
  // Check accident password update

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("users", userSchema);
