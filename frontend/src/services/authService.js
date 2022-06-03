import axios from "../api/axios";
// import Cookies from "js-cookie";

const REGISTER_URL = "/users";
const LOGIN_URL = "/users/login";
const DEVICES_URL = "/devices/";

export async function login(userData) {
  try {
    const params = new URLSearchParams();
    params.append("username", userData.username);
    params.append("password", userData.password);
    const response = await axios.post(LOGIN_URL, params, {
      withCredentials: true,
    });

    localStorage.setItem("user", response?.data?.username);

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

export function logout() {
  localStorage.removeItem("user");
}

export async function register(userData) {
  try {
    const response = await axios.post(REGISTER_URL, userData, {
      withCredentials: true,
    });
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

export async function checkToken(token) {
  try {
    const response = await axios.get(DEVICES_URL, {
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
        message: "Unauthorized.",
      };
    } else {
      return {
        ...err,
        message: "Unexpected error occured.",
      };
    }
  }
}
