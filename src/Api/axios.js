import axios from "axios";

const axiosInstance = axios.create({
    // local instance of amazon-api backend
     baseURL: import.meta.env.VITE_API_URL, // your amazon-api backend URL
    
    // Depoloyed version of amazon server on render.com
    // baseURL: "https://react-amazon-clone-0jpc.onrender.com/",
});

export { axiosInstance };
