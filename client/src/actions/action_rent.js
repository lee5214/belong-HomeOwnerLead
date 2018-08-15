import axios from "axios";
const FETCH_RENT_ZESTIMATE = "fetchRentZestimate";
const fetchRentZestimate = term => async dispatch => {
  //let str = term.replace(/ /g, " ");
  let param = {
    address: "437 Bancroft Avenue",
    citystatezip: "San Leandro, CA"
  };

  // "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18f9udv03kb_2avji&address=361+Saint+George+Street&citystatezip=CA";
  await axios.post("/rent", param).then(res => {
    console.log("fetch rent", res.data);
    let obj = { param, data: res.data };
    dispatch({ type: FETCH_RENT_ZESTIMATE, payload: obj });
  });
  //console.log(res);
};
export { FETCH_RENT_ZESTIMATE, fetchRentZestimate };
