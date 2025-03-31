import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

export default instance;
