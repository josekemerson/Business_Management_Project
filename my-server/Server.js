const express = require('express')
const app = express()
const port  = 3000
const bodyparser = require ("body-parser");
const Razorpay =  require('razorpay')
app.use(require("body-parser").json());

var instance = new Razorpay({
    key_id: "rzp_test_8y1EXTs8mPsus9",
    key_secret: "6BMSCuECAGurTarBuTY6ZyCa",
  });
  
app.get('/',(req,res)=> {
  res.sendFile("", {root: __dirname});
})

app.post('.create/orderId', (req,res) => {
  cosole.log("create orderId request", req.body);
  
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send({orderId : order.id});
  });

})