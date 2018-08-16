const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  var ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  ).split(",")[0];

  //ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.send(ip);
});

module.exports = router;
