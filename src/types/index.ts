export type AppError = {
  message: string
  details: string
  link?: { url: string; text: string }
}

export type MutationError = Error & { response?: { data: string } }

export type User = {
  _id: string
  email: string
  username: string
  isAdmin: boolean
}

export type UserInput = Pick<User, "email" | "username"> & { password: string }

export type Campground = {
  _id: string
  title: string
  image: string
  location: string
  price: number
  description: string
  geometry: { type: "Point"; coordinates: [number, number] }
  createdAt: string
  updatedAt: string
  author: User
  reviews: Review[]
}

export type CampgroundInput = Pick<
  Campground,
  "title" | "image" | "location" | "price" | "description"
>

export type CampgroundsData = {
  pageParams?: unknown[]
  pages?: { campgrounds: Pick<Campground, "_id">[]; totalPages: number }[]
}

export type Review = {
  _id: string
  rating: number
  body: string
  createdAt: string
  updatedAt: string
  author: User
}

export type ReviewInput = Pick<Review, "rating" | "body">
