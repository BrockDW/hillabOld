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

router.get("/getAllVols", check2Auth, (req, res, next) => {
  // console.log(req.userData);
  const { userID } = req.userData;
  let getVolSql = "SELECT * FROM vols";
  db.query(getVolSql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err,
        message: "vols data selection error",
      });
    } else {
      if (results.length == 0) {
        res.status(401).json({
          message: "词库读取失败，请重试",
        });
      } else {
        return res.status(200).json({
          vols: results,
        });
      }
    }
  });
});


module.exports = router;