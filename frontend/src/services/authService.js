import axios from "../api/axios";

const REGISTER_URL = "/users";
const LOGIN_URL = "/users/login";

export async function login(userData) {
  try {
    const params = new URLSearchParams();
    params.append("username", userData.username);
    params.append("password", userData.password);
    const response = await axios.post(LOGIN_URL, params, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    if (!err?.response) {
      return {
        ...err,
        message: "No response.",
      };
    } else if (err.response?.status === 401) {
      return {
        ...err,
        message: "Wrong username or password.",
      };
    } else {
      return {
        ...err,
        message: "Login failed.",
      };
    }
  }
}

// export function logout() {

// }

export async function register(userData) {
  try {
    const response = await axios.post(REGISTER_URL, userData);
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
