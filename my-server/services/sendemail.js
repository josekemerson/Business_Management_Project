var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "josekemerson007@gmail.com",
    pass: "Josekemerson@99",
  },
});

var mailOptions = {
  from: "josekemerson007@gmail.com",
  to: "abysonmathew.k@gmail.com",
  subject: "ROI Id Number",
  text: `Your Id is 123456789`,
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
