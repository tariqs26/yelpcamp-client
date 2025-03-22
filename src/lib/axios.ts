import axios from "axios"
import { ERROR_DETAILS } from "./constants"

const axiosInstance = (extendUrl = "") => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}${extendUrl}`,
    withCredentials: true,
    timeout: 5000, // 5 seconds
    timeoutErrorMessage: ERROR_DETAILS.SERVER_TIMEOUT,
  })
  return instance
}

export { axiosInstance as axios }

export default axiosInstance()
