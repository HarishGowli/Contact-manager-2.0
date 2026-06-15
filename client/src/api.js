import axios from "axios";

const API = axios.create({
  baseURL:
    "https://contactmanagerapibackend.vercel.app/",
});

export default API;
// baseURL: "http://localhost:5000/api/contacts"

// vercel url: https://contact-manager-backend.vercel.app