import axios from "axios";

export const nextApi = axios.create({
  baseURL: "/api",
});

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "x-api-key": "zrn4fyn_txa5QTQ2ytc" },
});
