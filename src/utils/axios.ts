import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_ROBUST_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token'),
    },  
});

export default instance;