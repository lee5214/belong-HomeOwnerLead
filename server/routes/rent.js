const express = require("express");
const router = express.Router();
const axios = require("axios");
const parser = require("xml2json");

router.post("/", async (req, res, next) => {
  const { address, citystatezip } = req.body;
  const key = "X1-ZWz18f9udv03kb_2avji";
  const url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${key}&rentzestimate=true&address=${address}&citystatezip=${citystatezip}`;

  let data = await axios
    .get(url)
    .then(async res => {
      return res.data;
    })
    .catch(error => next(error));

  //xml to json
  let ans = await parser.toJson(data);
  res.send(JSON.parse(ans));
});

router.get("/", async (req, res, next) => {
  const key = "X1-ZWz18f9udv03kb_2avji";
  const param = {
    //"zws-id": key,
    rentzestimate: true,
    address: "437 Bancroft Avenue",
    citystatezip: "San Leandro, CA"
  };
  const url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${key}&rentzestimate=true&address=${
    param.address
  }&citystatezip=${param.citystatezip}`;

  //res.render("index", { title: "Express" });
  let data = await axios
    .get(url)
    .then(async res => {
      //return res.data;
      //let jsonObj = parseString(res.data, result => result);
      //let ans = jsonObj["SearchResults:searchresults"].response.results.result;
      return await parser.toJson(res.data);
      //console.log(jsonObj["SearchResults:searchresults"]);
      //return jsonObj;
      //return res.data;
    })
    .catch(error => console.log(error));
  //let ans = null;
  //await parseString(data, (err, result) => (ans = result));
  res.json(JSON.parse(data)["SearchResults:searchresults"]);
});

module.exports = router;
