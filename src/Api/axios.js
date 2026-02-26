import axios from "axios";

const axiosInstance = axios.create({
    // local instance of amazon-api backend
     baseURL: import.meta.env.VITE_API_URL, // your amazon-api backend URL
    
    // Deployed version of ecommerce backend on render.com
    // baseURL: "https://react-amazon-backend-project.onrender.com/",
});

export { axiosInstance };
