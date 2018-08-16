const express = require("express");
const router = express.Router();
const axios = require("axios");
const parser = require("xml2json");
const zillowKey = require("../config/credentials").zillowKey;

router.post("/", async (req, res) => {
  const { address, citystatezip } = req.body;
  console.log(req.body);
  const url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowKey}&rentzestimate=true&address=${address}&citystatezip=${citystatezip}`;

  let data = await axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log("/rent error");
      res
        .status(500)
        .send({ address, citystatezip, message: "serve can't fetch result" });
    });

  //xml to json
  let jsonObj = await parser.toJson(data);
  let result = JSON.parse(jsonObj)["SearchResults:searchresults"];
  if (!result.response) {
    res
      .status(result.message.code)
      .send({ address, citystatezip, message: result.message.text });
  } else {
    // console.log(result.response.results.result.zestimate.amount.currency);
    res.send(result.response.results.result);
  }
});

module.exports = router;
