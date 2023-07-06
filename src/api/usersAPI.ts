import axios, { isAxiosError } from "axios"
import { ErrorDetails } from "types/Error"

const usersAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 5000, // 5 seconds
})

export const registerUser = async (
  user: UserInput,
): Promise<AppUser | string> => {
  try {
    const res = await usersAPI.post("/register", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? error.response?.data
      : ErrorDetails.FAILED_REGISTER
  }
}

export const loginUser = async (user: UserInput): Promise<AppUser | string> => {
  try {
    const res = await usersAPI.post("/login", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? ErrorDetails.INVALID_CREDENTIALS
      : ErrorDetails.FAILED_LOGIN
  }
}

export const logoutUser = async (): Promise<void> => {
  await usersAPI.get("/logout")
}

export const fetchUser = async (): Promise<AppUser> =>
  (await usersAPI.get("/getUser")).data

export default usersAPI
