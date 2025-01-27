import axios from "axios";
import { notify } from "../utils/notification";

const API_URL = import.meta.env.REACT_APP_URL;

// Fetch all products
export const getProducts = async () => {
  try {
    const token = localStorage.getItem("ecomtoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/products/getproducts`, config);
    return response.data.data;
  } catch (error) {
    consol.log(error);
  }
};
export const addProduct = async (data) => {
  try {
    const token = localStorage.getItem("ecomtoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/products/addproduct`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    consol.log(error);
    notify("error", error.response.data.message);
  }
};

// Signup
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

// Login
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

// Add to cart
export const addToCart = async (data) => {
  try {
    const token = localStorage.getItem("ecomtoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/cart/addtocart`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
    console.log(error.message);
  }
};

// Get cart items
export const getCart = async () => {
  try {
    const token = localStorage.getItem("ecomtoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/cart/getcartproduct`, config);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
// Get cart items
export const removeFromCart = async (data) => {
  try {
    const token = localStorage.getItem("ecomtoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(`${API_URL}/cart/removefromcart`,data, config);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);

    console.log(error);
  }
};
