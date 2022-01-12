import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

instance.interceptors.request.use( config => {
    config.headers.Autorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

export default instance