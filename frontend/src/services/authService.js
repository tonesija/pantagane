import axios from "../api/axios";

const REGISTER_URL = "/users";
const LOGIN_URL = "/users/login";

export async function login(userData) {
  try {
    const response = await axios.post(LOGIN_URL, JSON.stringify(userData));
    return response;
  } catch (err) {
    if (!err?.response) {
      return {
        message: "No response.",
      };
    } else if (err.response?.status === 400) {
      return {
        message: "Wrong username or password.",
      };
    } else {
      return {
        message: "Registration failed.",
      };
    }
  }
}

// export function logout() {

// }

export async function register(userData) {
  try {
    const response = await axios.post(REGISTER_URL, JSON.stringify(userData));
    return response;
  } catch (err) {
    if (!err?.response) {
      return {
        message: "No response.",
      };
    } else if (err.response?.status === 409) {
      return {
        message: "Username taken.",
      };
    } else {
      return {
        message: "Registration failed.",
      };
    }
  }
}

// export function checkToken(token) {

// }
