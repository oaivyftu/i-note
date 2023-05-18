import axios, { AxiosError } from "axios"

console.log(process.env.REACT_APP_HOST_URL)
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST_URL}`,
  headers: {
    "Content-type": "application/json",
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default axiosInstance
