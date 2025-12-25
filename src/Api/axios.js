import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firebase function
    baseURL: "http://127.0.0.1:5001/clone-b2076/us-central1/api", // your backend URL
    
    // Depoloyed version of amazon server on render.com
    // baseURL: "https://react-amazon-clone-0jpc.onrender.com/",
});

export { axiosInstance };
