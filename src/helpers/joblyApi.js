import axios from "axios";
const DATABASE_URL = process.env.REACT_APP_DB_URL || 'http://localhost:3001/';

class JoblyApi {
  /**
   * request method takes an endpoint, data, and verb
   * puts together the API call based on what was passed
   * before making the call, checks user is logged in by appending token
   * passes data either via query or body depending on verb
   */
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    console.debug("API Call:", endpoint, paramsOrData, verb);
    paramsOrData._token = localStorage.getItem("token");
    try {
      return (await axios({
        method: verb,
        url: `${DATABASE_URL}${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** simple method for grabbing data for individual company */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
}

export default JoblyApi;
