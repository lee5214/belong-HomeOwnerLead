const express = require("express");
const router = express.Router();
const key = require("../config/credentials/devKey").sendGridKey;
/* GET home page. */
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(key);
const msg = {
  to: "congli5214@gmail.com",
  from: "cong-li@cong-li.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js"
  //html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};

router.post("/", function(req, res, next) {
  const { to, from, subject, text, html } = req.body;
  const msg = {
    to,
    from,
    subject,
    text,
    html
  };
  console.log("email msg", msg);
  sgMail.send(msg);
});

module.exports = router;
