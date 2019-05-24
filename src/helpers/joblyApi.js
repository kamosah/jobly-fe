import axios from 'axios';

/**
 * 
 */
export default class JoblyApi {

  /** */
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    console.debug("API Call:", endpoint, paramsOrData, verb);
    paramsOrData._token = localStorage.getItem("token");
    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }
    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
}
