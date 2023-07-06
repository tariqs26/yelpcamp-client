type User = {
  _id: string
  username: string
  email: string
  password: string
}

type UserInput = Omit<User, "_id">
type AppUser = Omit<User, "password"> & {
  isAdmin: boolean
}
