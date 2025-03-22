import axios from "~/lib/axios"

export const register = async (user: UserInput): Promise<AppUser> =>
  (await axios.post("/register", user)).data

export const login = async (user: UserInput): Promise<AppUser> =>
  (await axios.post("/login", user)).data

export const logout = () => axios.post("/logout")

export const getUser = async (): Promise<AppUser | undefined> =>
  (await axios.get("/getUser")).data
