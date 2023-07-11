import axios from "axios"

const axiosInstance = (extendUrl: string = "") => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}${extendUrl}`,
    withCredentials: true,
    timeout: 5000, // 5 seconds
  })
  return instance
}

export { axiosInstance as axios }

export default axiosInstance()
