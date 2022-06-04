// Funkcije za fetchanje potrebnih podataka (npr. history)
import axios from "../api/axios";

const DEVICE_URL = "/devices/";

export async function getDevices() {
  try {
    const response = await axios.get(DEVICE_URL, {
      withCredentials: true,
    });
    return response.data;
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
        message: "Unexpected error.",
      };
    }
  }
}

export async function addDevice(deviceData) {
  try {
    const response = await axios.post(DEVICE_URL, deviceData, {
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
    } else if (err.response?.status === 409) {
      return {
        ...err,
        message: "Device with that name already exists.",
      };
    } else {
      return {
        ...err,
        message: "Unexpected error.",
      };
    }
  }
}

export async function getReadings(device) {
  try {
    const response = await axios.get(`/readings/${device}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
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
        message: "Unexpected error.",
      };
    }
  }
}
