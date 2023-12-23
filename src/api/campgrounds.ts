import { isAxiosError } from "axios"
import { axios } from "lib/axios"
import { ErrorDetails } from "types/errors"

const campgroundsAPI = axios("/campgrounds")

export const fetchCampgrounds = async ({
  pageParam: page = 1,
}): Promise<{
  campgrounds: Campground[]
  totalPages: number
}> => {
  return (await campgroundsAPI.get("/", { params: { page } })).data
}

export const fetchCampgroundById = async (
  id: string
): Promise<Campground | AppError> => {
  try {
    return (await campgroundsAPI.get(`/${id}`)).data
  } catch (err) {
    return isAxiosError(err) && err.code === "SERVER_ERROR"
      ? {
          message: err.message,
          details: ErrorDetails.SERVER_ERROR,
        }
      : {
          message: "Campground not Found",
          details: ErrorDetails.NOT_FOUND,
          link: {
            url: "/campgrounds",
            text: "Go to Campgrounds",
          },
        }
  }
}
export const createCampground = async (
  campground: CampgroundInput
): Promise<Campground> => (await campgroundsAPI.post("/", campground)).data

export const updateCampground = async ({
  id,
  campground,
}: {
  id: string
  campground: CampgroundInput
}) => await campgroundsAPI.put(`/${id}`, campground)

export const deleteCampground = async (id: string) =>
  await campgroundsAPI.delete(`/${id}`)

export default campgroundsAPI
