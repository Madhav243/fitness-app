import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_EXERCISES_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
});
