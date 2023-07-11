import { isAxiosError } from "axios"
import axios from "lib/axios"
import { ErrorDetails } from "types/Error"

export const registerUser = async (
  user: UserInput
): Promise<AppUser | string> => {
  try {
    const res = await axios.post("/register", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? error.response?.data
      : ErrorDetails.FAILED_REGISTER
  }
}

export const loginUser = async (user: UserInput): Promise<AppUser | string> => {
  try {
    const res = await axios.post("/login", user)
    return res.data
  } catch (error) {
    return isAxiosError(error) && error.code !== "ERR_NETWORK"
      ? ErrorDetails.INVALID_CREDENTIALS
      : ErrorDetails.FAILED_LOGIN
  }
}

export const logoutUser = async () => {
  await axios.get("/logout")
}

export const fetchUser = async (): Promise<AppUser> =>
  (await axios.get("/getUser")).data
