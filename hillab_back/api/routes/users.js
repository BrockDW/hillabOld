const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const check2Auth = require("../middleware/check-auth");
// const async = require("async");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");
const expireTime = "10h";

// router.post("/signup", (req, res, next) => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     let user = {
//         email: req.body.email,
//         password: hash,
//     }
//     let sql = 'INSERT INTO users SET ?';
//     db.query(sql, user, (err, usersInsertResult) => {
//         if (err) {
//             console.log(err.code)
//             var message = ""
//             if (err.code == "ER_DUP_ENTRY") {
//                 message = "your account is already registered"
//             } else {
//                 message = "user data incertion error"
//             }
//             return res.status(500).json({
//                 err: err,
//                 message: message
//             })
//         } else {
//             console.log("ahh");
//             var userID = usersInsertResult.insertId;
//             var curPlayerNum = Math.floor(100000 + Math.random() * 900000);
//             var profileInfo = {
//                 username: "Player" + curPlayerNum,
//                 bio: "I am a player",
//                 profileImg: "default_player_img.png",
//                 userID: userID
//             }
//             let insertProfileSql = "INSERT INTO profile SET ?"
//             db.query(insertProfileSql, profileInfo, (err, result) => {
//                 if (err) {
//                     console.log(err)
//                     return res.status(500).json({
//                         err: err,
//                         message: "something is wrong when inserting into profile page"
//                     })
//                 } else {

//                     const token = jwt.sign(
//                         { userID: userID},
//                         'secret',
//                         { expiresIn: expireTime }
//                     );
//                     return res.status(200).json({
//                         message: "account registered, jump to homepage now",
//                         token: token
//                     })
//                 }
//             });
//         }
//     });

// });

// this is the post for login
router.post("/login", (req, res, next) => {
  console.log(req.body.username);
  //根据输入email，检查相关用户是否存在
  db.query(
    "SELECT * FROM users WHERE username = " +
      "'" +
      req.body.username +
      "' AND password = '" +
      req.body.password +
      "'",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          err: err,
          message: "登录失败，请联系管理员",
        });
      }
      //如果存在，设立token，反馈200（正常）
      if (results.length == 1) {
        user = results[0];
        const token = jwt.sign({ userID: user.userID }, "secret", {
          expiresIn: expireTime,
        });

        return res.status(200).json({
          message: "登录成功",
          token: token,
        });
      } else {
        return res.status(401).json({
          message: "登录失败，请检查用户名或密码",
        });
      }
    }
  );
});

router.get("/getProfile", check2Auth, (req, res, next) => {
  // console.log(req.userData);
  const { userID } = req.userData;
  let getProfileSql =
    "SELECT username, nickname, relatedTopic, profileImg FROM users WHERE userID = " +
    userID;
  db.query(getProfileSql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err,
        message: "user data selection error",
      });
    } else {
      if (results.length == 0) {
        res.status(401).json({
          message: "未找到您的信息，请重新登录",
        });
      } else {
        return res.status(200).json({
          profile: results[0],
        });
      }
    }
  });
});

router.post("/updateProfile", check2Auth, (req, res, next) => {
  // console.log(req.userData);
  const { userID } = req.userData;
  // console.log("I am working here")
  let updateProfileSql = "UPDATE users SET ? WHERE userID = " + userID;
  db.query(updateProfileSql, req.body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err,
        message: "user data update error",
      });
    } else {
      return res.status(200).json({
        message: "保存成功！",
      });
    }
  });
});

// router.post("/resetPswSend", (req, res, next) => {
//   async.waterfall(
//     [
//       function (done) {
//         crypto.randomBytes(20, function (err, buf) {
//           var token = "";
//           for (var i = 0; i < 6; i++) {
//             var first = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
//             token += first.toString();
//           }
//           // console.log(token);
//           done(err, token);
//         });
//       },
//       function (token, done) {
//         var newUser = {};
//         newUser.resetPswToken = token;
//         var resetPswExpires = new Date(Date.now() + 3600000); // 1 hour
//         newUser.resetPswExpires = resetPswExpires.toString();
//         // console.log(newUser);
//         let sqlResetToken =
//           "UPDATE users SET ? WHERE email = '" + req.body.email + "'";
//         db.query(sqlResetToken, newUser, (err, results) => {
//           if (err) {
//             return res.status(500).json({
//               err: err,
//               message: "something is wrong when trying to find previous users",
//             });
//           }
//           if (results.affectedRows == 0) {
//             return res.status(401).json({
//               message: "mail is not registered in our system",
//             });
//           }
//           done(err, token, req.body.email);
//         });
//       },
//       function (token, email, done) {
//         var smtpTransport = nodemailer.createTransport({
//           service: "hotmail",
//           auth: {
//             user: "brockdwrobot@outlook.com",
//             pass: "alan987m",
//           },
//         });
//         var mailOptions = {
//           to: email,
//           from: "brockdwrobot@outlook.com",
//           subject: "TRPG Player Password Reset",
//           text:
//             "For reset password, please enter the follow OTP in the OTP section: \n\n" +
//             token,
//         };
//         smtpTransport.sendMail(mailOptions, function (err) {
//           if (err) {
//             return res.status(500).json({
//               message: "mail sending failed",
//             });
//           } else {
//             done(err, "done");
//           }
//         });
//       },
//     ],
//     function (err) {
//       if (err) return next(err);
//       res.status(200).json({
//         message: "Done",
//       });
//     }
//   );
// });

// router.post("/resetForgotPsw", (req, res, next) => {
//   var otp = req.body.otp;
//   var newPsw = req.body.password;
//   var email = req.body.email;
//   let sqlSelectTokenAndTime =
//     "SELECT resetPswToken, resetPswExpires FROM users WHERE email = '" +
//     email +
//     "'";
//   db.query(sqlSelectTokenAndTime, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({
//         err: err,
//         message:
//           "something is wrong when trying to select the user psw token and time",
//       });
//     } else {
//       var curResult = results[0];
//       console.log(curResult.resetPswToken, otp);
//       var curDate = new Date();
//       if (curResult.resetPswToken != otp) {
//         return res.status(401).json({
//           message: "otp invalid",
//         });
//       } else if (curDate > curResult.resetPswExpires) {
//         return res.status(401).json({
//           message: "otp expired, please try again",
//         });
//       } else {
//         console.log(newPsw);
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(newPsw, salt);
//         let updateNewPsw =
//           "UPDATE users SET password = '" +
//           hash +
//           "', resetPswToken = Null, resetPswExpires = Null WHERE email = '" +
//           email +
//           "'";
//         db.query(updateNewPsw, (err, results) => {
//           if (err) {
//             console.log(err);
//             return res.status(500).json({
//               err: err,
//               message: "something is wrong when trying to update psw",
//             });
//           } else {
//             return res.status(200).json({
//               message: "reset password successful",
//             });
//           }
//         });
//       }
//     }
//   });
// });

module.exports = router;
