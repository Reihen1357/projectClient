import axios, { InternalAxiosRequestConfig } from "axios";

export const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const authClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authClient.interceptors.request.use(authInterceptor)