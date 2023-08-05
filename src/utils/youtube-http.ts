import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_YOUTUBE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
});