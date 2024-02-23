type Alert = {
  message: string
  variant: "success" | "danger"
}

type AppError = {
  message: string
  details: string
  link?: {
    url: string
    text: string
  }
}

type MutationError = Error & {
  response?: {
    data: string
  }
}

type FormProps = {
  handleSubmit: React.FormEventHandler
  isPending: boolean
}

type Campground = {
  _id: string
  author: AppUser
  title: string
  image: string
  location: string
  price: number
  reviews: Review[]
  description: string
  createdAt: string
  updatedAt: string
  geometry: {
    type: "Point"
    coordinates: [number, number]
  }
}

type CampgroundInput = Pick<
  Campground,
  "title" | "image" | "location" | "price" | "description"
>

type CampgroundsData =
  | {
      pageParams?: unknown[]
      pages?: { campgrounds: Pick<Campground, "_id">[]; totalPages: number }[]
    }
  | undefined

type Review = {
  _id: string
  author: AppUser
  rating: number
  body: string
}

type ReviewInput = Omit<Review, "_id" | "author">

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
