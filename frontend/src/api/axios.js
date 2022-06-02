import axios from "axios";

const BASE_URL = "https://pantagane-web-app.herokuapp.com/";

export default axios.create({
  baseURL: BASE_URL,
});
