import axios from "axios"

const axiosInstance = (extendUrl = "") => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}${extendUrl}`,
    withCredentials: true,
    timeout: 5000, // 5 seconds
    timeoutErrorMessage: "The server took too long to respond.",
  })
  return instance
}

export { axiosInstance as axios }

export default axiosInstance()
