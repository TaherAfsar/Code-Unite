import axios from "axios";

const API = axios.create({
  baseURL: "https://api.jdoodle.com/v1/execute",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",           //Accept request from everyone
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default API;
