const express = require("express");
const router = express.Router();

/* GET home page. */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const msg = {
  to: "congli5214@gmail.com",
  from: "cong-li@cong-li.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};

router.get("/", function(req, res, next) {
  var ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  ).split(",")[0];

  sgMail.send(msg);
  //ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.send(ip);
});

module.exports = router;
