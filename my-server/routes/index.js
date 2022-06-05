var express = require("express");
var router = express.Router();
var users = require("./model/userModel");
var advisors = require("./model/AddAdvisor");
var appointments = require("./model/Appointment");
var leave = require("./model/Leave");
var stockdata = require("./model/StockGeneration");
var auction = require("./model/Auction");
const dotenv = require("dotenv");
dotenv.config();

//file upload
const fileupload = require("express-fileupload");
const app = express();
app.use(fileupload());

//forgot Password
const accountSid = process.env.TWILIO_ACOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const chatBots = require("./model/chatBot");
const InvestorIdeas = require("./model/investorIdeas");
const patentideas = require("./model/PatentIdeas");

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middleware/authenticate");
const PatentIdeas = require("./model/PatentIdeas");

const config = require("../config");
const client = require("twilio")(accountSid, authToken);

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Jose" });
});

router.post("/SignUp", async (req, res, next) => {
  var user;
  if (req.body.type === "advisor") {
    user = new users({
      uname: req.body.uname,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.type,
      status: "inactive",
      password: req.body.password,
    });
  } else {
    user = new users({
      uname: req.body.uname,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.type,
      password: req.body.password,
    });
  }
  console.log(req.body.type);
  var response = await user
    .save()
    .then((response) => {
      res.json({
        message: response,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});
router.post("/chatBot", async (req, res, next) => {
  const chatBot = new chatBots({
    submit: req.body.submit,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });
  var response = await chatBot
    .save()
    .then((response) => {
      res.json({
        message: response,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});
router.post("/saveInvestIdea", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  console.log(userMan);
  if (userMan.role == "investor" || userMan.role == "business") {
    const investorIdeas = new InvestorIdeas({
      topic: req.body.topic,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      userName: userMan.uname,
      userPhone: userMan.phone,
      userEmail: userMan.email,
      userId: userMan._id,
    });
    var response = await investorIdeas
      .save()
      .then((response) => {
        return res.status(200).send({
          message: response,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({
          message: error,
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
router.get("/showInvestIdeaBusiness", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "business") {
    await InvestorIdeas.find()
      .populate("users")
      .then((response) => {
        return res.status(200).send({
          message: response,
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: error,
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
router.get("/showUserInvestIdea", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "investor") {
    const ideas = await InvestorIdeas.find({ userId: userMan._id })
      .then((response) => {
        return res.status(200).send({
          message: response,
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: "Error",
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});

//Show Appointments
router.post("/showAppointments", async (req, res, next) => {
  const userMan = await appointments
    .find({ AppointAdvisorId: req.body.advisorId })
    .then((response) => {
      return res.status(200).send({
        users: response,
      });
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error",
      });
    });
});

//Show Appointments user
router.get("/showAppointmentsuser", async (req, res, next) => {
  const userMan = await appointments
    .find({ userId: req.body.userId })
    .then((response) => {
      return res.status(200).send({
        users: response,
      });
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error",
      });
    });
});

//deactivate Appointments
router.post("/deactivateappointments", async (req, res, next) => {
  let userID = req.body.appointmentId;
  let userStatus = {
    status: "inactive",
  };
  appointments
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User Blocked",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//Activate Appointments
router.post("/activateappointments", async (req, res, next) => {
  let userID = req.body.appointmentId;
  let userStatus = {
    status: "active",
  };
  appointments
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User Blocked",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

//delete Single Idea
router.post("/deleteInvestIdea", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "investor") {
    const postId = req.body.postId;
    const ideas = await InvestorIdeas.findByIdAndUpdate(postId, {
      $set: { status: "inactive" },
    })
      .then(() => {
        return res.status(200).send({
          message: "Post Set to inactive",
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: "Post Not Deleted due to server Error",
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
//Make Single Idea Active
router.post("/activateInvestIdea", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "investor") {
    const postId = req.body.postId;
    const ideas = await InvestorIdeas.findByIdAndUpdate(postId, {
      $set: { status: "active" },
    })
      .then(() => {
        return res.status(200).send({
          message: "Post Set to inactive",
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: "Post Not Deleted due to server Error",
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
//Update Idea
router.post("/updateInvestIdea", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "investor") {
    const postId = req.body.postId;
    let data = {
      topic: req.body.topic,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
    };
    const ideas = await InvestorIdeas.findByIdAndUpdate(postId, { $set: data })
      .then(() => {
        return res.status(200).send({
          message: "Post Updated",
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: "Post Not Updated",
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
//Make Single Idea Delete Permanantlz
router.post("/deleteIdeaPermanant", Authenticate, async (req, res, next) => {
  const userMan = await users.findOne({ email: req.auth.email });
  if (userMan.role == "investor") {
    const postId = req.body.postId;
    const ideas = await InvestorIdeas.findByIdAndRemove(postId)
      .then(() => {
        return res.status(200).send({
          message: "Post Deleted",
        });
      })
      .catch(() => {
        return res.status(500).send({
          message: "Post Not Deleted due to server Error",
        });
      });
  } else {
    return res.status(500).send({
      message: userMan.role,
    });
  }
});
router.get("/myProfile", Authenticate, async (req, res, next) => {
  const userMan = await users
    .findOne({ email: req.auth.email })
    .then((userDetails) => {
      return res.status(200).send({
        message: userDetails,
      });
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error",
      });
    });
});
router.post("/login", async (req, res, next) => {
  try {
    //validation
    if (!req.body.email || !req.body.password)
      return res.status(400).json({
        status: false,
        message: req.body.email,
      });

    const user = await users.findOne({
      email: req.body.email,
    });
    if (user.status === "active") {
      console.log(user);
      if (!user)
        return res.status(404).json({
          status: false,
          message: "User does not exist",
        });
      const pwdMatch = await bcrypt.compare(req.body.password, user.password);
      if (!pwdMatch)
        return res.status(401).json({
          status: false,
          message: "Password Incorrect",
        });
      const token = jwt.sign(
        { userid: user._id, email: user.email },
        process.env.SECRET_CODE,
        { expiresIn: "1d" }
      );
      res.status(200).send({
        role: user.role,
        id: user._id,
        username: user.uname,
        useremail: user.email,
        userphone: user.phone,
        token: "Bearer " + token,
      });

      // return res.status(200).json({
      //   token: token,
      // });
    } else {
      return res.status(500).send({
        message: "user denied",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message,
      data: err,
    });
  }
});

//Admin User

router.post("/deleteUser", async (req, res, next) => {
  let userID = req.body.userID;
  users
    .findByIdAndDelete(userID)
    .then((user) => {
      return res.status(200).send({
        message: "User Deleted Successfully",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//block user
router.post("/blockUser", async (req, res, next) => {
  let userID = req.body.userID;
  let userStatus = {
    status: "inactive",
  };
  users
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User Blocked",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//Reactivate a User
router.post("/activateUser", async (req, res, next) => {
  let userID = req.body.userID;
  let userStatus = {
    status: "active",
  };
  users
    .findByIdAndUpdate(userID, { $set: userStatus })
    .then((user) => {
      return res.status(200).send({
        message: "User ReActivated",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
router.get("/getusers", async (req, res) => {
  await users
    .find()
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ users: response });
      } else {
        res.status(401).json({ status: failed });
      }
    });
});
router.get("/purchaseDetails/:id", async (req, res) => {
  console.log(req.params.id);
  await InvestorIdeas.find({ _id: req.params.id })
    .populate("userId", "uname email phone")
    .exec(function(err, data) {
      console.log(data);
      res.status(200).json({ users: data });
    });
});

//Booking

router.post("/appointments", async (req, res, next) => {
  console.log(req.body);
  var appointment = new appointments({
    AppointName: req.body.aname,
    AppointPhone: req.body.aphone,
    AppointAdvisorId: req.body.aadvisor,
    AppointDate: req.body.adate,
    AppointTime: req.body.atime,
    userId: req.body.id,
  });
  var response = await appointment.save();
  //console.log(response);
  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

//Add Advisors

router.post("/addadvisors", async (req, res, next) => {
  console.log(req.body);
  var addadvisor = new advisors({
    AdvisorName: req.body.advisorname,
    AdvisorPhone: req.body.advisorphone,
    AdvisorEmail: req.body.advisoremail,
  });
  var response = await addadvisor.save();
  //console.log(response);
  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

//get Advisors

router.get("/getadvisors", async (req, res) => {
  await users
    .find({ status: "active", role: "advisor" })
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ users: response });
      } else {
        res.status(401).json({ status: failed });
      }
    });
});

//leave

router.post("/leave", async (req, res, next) => {
  console.log(req.body);
  var leaves = new leave({
    AdvisorId: req.body.advisorid,
    LeaveReason: req.body.lreason,
    LeaveDate: req.body.ldate,
  });
  var response = await leaves.save();
  //console.log(response);
  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

//fetch the leaves

router.get("/getleaves", async (req, res) => {
  await leave
    .find()
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ leave: response });
      } else {
        res.status(401).json({ status: failed });
      }
    });
});

router.post("/setdate", async (req, res, next) => {
  let userID = req.body.advisorid;
  let userleave = req.body.date;
  let userLeave = {
    leave: userleave,
  };
  users
    .findByIdAndUpdate(userID, { $set: userLeave })
    .then((user) => {
      return res.status(200).send({
        message: "date updated",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

router.post("/savepatentIdeas", async (req, res, next) => {
  //   console.log(__dirname)
  // const img_name = Date.now()+req.body.filename;
  // const file = req.files.file;
  // const newpath = __dirname + "/Images/"
  var patentIdeas = new patentideas({
    patentId: req.body.patentid,
    classification: req.body.pclassification,
    date: req.body.pdate,
    priority_data: req.body.ppriority_data,
    applicant: req.body.papplicant,
    inventor: req.body.pinventor,
    title: req.body.ptitle,
    abstract: req.body.pabstract,
    price: req.body.pprice,
    userId: req.body.puserid,
    price_expiry: req.body.pprice_expiry,
    // img: img_name,
  });
  var response = await patentIdeas.save();

  // file.mv(`${newpath}${img_name}`,(err) =>{
  //   if(err){
  //     console.log(err);
  //   }
  // })
  //console.log(response);
  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

router.get("/getpatentideas", async (req, res) => {
  await patentideas
    .find()
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ message: response });
      } else {
        res.status(401).json({ status: failed });
      }
    });
});

// //stock data

// router.post("/saveStock", async (req, res, next) => {
//   let checker = await stockdata.find({ comapanyName: req.body.scompanyName });
//   if (checker.length == 0) {
//     let date = [req.body.sdate];
//     let stockPrice = [req.body.sstockPrice];
//     var StockData = new stockdata({
//       comapanyName: req.body.scompanyName,
//       date: date,
//       stockPrice: stockPrice,
//     });
//     var response = await StockData.save();
//     //console.log(response);
//     if (response) {
//       res.status(200).json({ response });
//     } else {
//       res.status(401).json({ status: "failed" });
//     }
//   } else {
//     let stockId = checker[0]._id;
//     let date = checker[0].date;
//     date.push(req.body.sdate);
//     let stockPrice = checker[0].stockPrice;
//     stockPrice.push(req.body.sstockPrice);
//     var StockData = {
//       comapanyName: req.body.scompanyName,
//       date: date,
//       stockPrice: stockPrice,
//     };
//     let response = await stockdata
//       .findByIdAndUpdate(stockId, StockData)
//       .then((data) => {
//         return res.status(200).send({
//           message: data,
//         });
//       });
//   }
// });

//get stock data
// router.post("/getStockData", async (req, res, next) => {
//   const GetStockData = await stockdata
//     .find({ comapanyName: req.body.scomapanyName })
//     .then((response) => {
//       var d = response[0].date.filter((word) => word);
//       var s = response[0].stockPrice.filter((word) => word);
//       return res.status(200).send({
//         stockdate: d,
//         stockprice: s,
//         cname: response.comapanyName,
//       });
//     })
//     .catch(() => {
//       return res.status(500).send({
//         message: "Error",
//       });
//     });
// });
//block PatentIdeas
router.post("/blockpatent", async (req, res, next) => {
  let patentId = req.body.patentId;
  console.log(patentId);
  let PatentStatus = {
    status: "inactive",
  };
  patentideas
    .findByIdAndUpdate(patentId, { $set: PatentStatus })
    .then((patentideas) => {
      return res.status(200).send({
        message: "User Blocked",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});
//Reactivate PatentIdeas
router.post("/reactivatepatent", async (req, res, next) => {
  let patentId = req.body.patentId;
  let PatentStatus = {
    status: "active",
  };
  patentideas
    .findByIdAndUpdate(patentId, { $set: PatentStatus })
    .then((patentideas) => {
      return res.status(200).send({
        message: "User ReActivated",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

//forgot password

router.post("/getsms", (req, res) => {
  try {
    let register_status = false;
    let mob = req.body.number;
    let mobno = `+${91}` + mob;

    client.verify
      .services(process.env.service_id)
      .verifications.create({
        to: mobno,
        channel: "sms",
      })
      .then((status) => {
        if (status) {
          register_status = true;
          res.status(200).json({ status: register_status, mob: mobno });
        }
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/verify", (req, res) => {
  console.log(req.body);
  let register_status = false;
  let mobno = `+${91}` + req.body.mobile;

  client.verify
    .services(process.env.service_id)
    .verificationChecks.create({
      to: mobno,
      code: req.body.code,
    })
    .then((status) => {
      if (status) {
        register_status = true;
        res.status(200).json({ status: register_status });
      }
    });
});

//reset password

router.post("/Resetpass", async (req, res) => {
  try {
    if (req.body.pass1 == req.body.pass2) {
      const salt = await bcrypt.genSalt(10);
      let pass = await bcrypt.hash(req.body.pass1, salt);
      await users
        .updateOne({ phone: req.body.mobile }, { $set: { password: pass } })
        .then((response) => {
          console.log(response);
        });
    } else {
      console.log("password mismatch");
    }
  } catch (error) {}
});

router.post("/PostPrice", async (req, res) => {
  var Auction = new auction({
    userId: req.body.userid,
    title: req.body.pttitle,
    price: req.body.bprice,
    price_expiry: req.body.ptprice_expiry,
    FinalPrice: req.body.fprice,
    userName: req.body.uname,
  });
  var response = await Auction.save();

  if (response) {
    res.status(200).json({ response });
  } else {
    res.status(401).json({ status: "failed" });
  }
});

//get Final Patent Price

router.get("/getFinalPrice", async (req, res) => {
  await auction
    .find()
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ message: response });
      } else {
        res.status(401).json({ status: failed });
      }
    });
});

//selecting Price
router.post("/SelectPrice", async (req, res, next) => {
  let auctionid = req.body.auctionid;
  let status = {
    Price_status: "selected",
  };
  auction
    .findByIdAndUpdate(auctionid, { $set: status })
    .then((auction) => {
      return res.status(200).send({
        message: "Patent Selected",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
});

//View Auction Results

router.post("/getAuctionResult", async (req, res) => {
  console.log(req.body.userid);
  await auction
    .find({ userId: req.body.userid })
    
    .exec()
    .then((response) => {
      if (response) {
        res.status(200).json({ auction: response });
        console.log(response);
      } else {
        res.status(401).json({ status: failed });
      }
    });
});

module.exports = router;
