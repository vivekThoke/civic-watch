import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status == 401){
            localStorage.removeItem("token");
            window.location.href="/login";
        }
        return Promise.reject(err);
    }

)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url.includes("/public")){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;