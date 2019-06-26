import axios from "axios";

export const client = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/",
  headers: {
    "Content-Type": "application/json"
  }
})
