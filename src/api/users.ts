import { isAxiosError } from "axios"
import axios from "lib/axios"
import ErrorDetails from "types/errors"

export const register = async (user: UserInput): Promise<AppUser | string> => {
  try {
    const res = await axios.post("/register", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? error.response?.data
      : ErrorDetails.FAILED_REGISTER
  }
}

export const login = async (user: UserInput): Promise<AppUser | string> => {
  try {
    const res = await axios.post("/login", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? ErrorDetails.INVALID_CREDENTIALS
      : ErrorDetails.FAILED_LOGIN
  }
}

export const logout = async () => {
  await axios.post("/logout")
}

export const getUser = async (): Promise<AppUser | undefined> =>
  (await axios.get("/getUser")).data
