import axios from "~/lib/axios"
import type { User, UserInput } from "~/types"

export const register = async (user: UserInput): Promise<User> =>
  (await axios.post("/register", user)).data

export const login = async (user: UserInput): Promise<User> =>
  (await axios.post("/login", user)).data

export const logout = () => axios.post("/logout")

export const getUser = async (): Promise<User | undefined> =>
  (await axios.get("/getUser")).data
