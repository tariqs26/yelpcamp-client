import { isAxiosError } from "axios"
import { axios } from "~/lib/axios"
import { ERROR_DETAILS } from "~/lib/constants"
import type { AppError, Campground, CampgroundInput } from "~/types"

const campgroundsApi = axios("/campgrounds")

export const getCampgrounds = async ({
  pageParam: page = 1,
}): Promise<{
  campgrounds: Campground[]
  totalPages: number
}> => (await campgroundsApi.get("/", { params: { page } })).data

export const getCampgroundById = async (
  id: string
): Promise<Campground | AppError> => {
  try {
    return (await campgroundsApi.get(`/${id}`)).data
  } catch (err) {
    return isAxiosError(err) && err.code === "SERVER_ERROR"
      ? {
          message: err.message,
          details: ERROR_DETAILS.SERVER_ERROR,
        }
      : {
          message: "Campground not Found",
          details: ERROR_DETAILS.NOT_FOUND("campground"),
          link: { url: "/campgrounds", text: "Go to Campgrounds" },
        }
  }
}
export const createCampground = async (
  campground: CampgroundInput
): Promise<Campground> => (await campgroundsApi.post("/", campground)).data

export const updateCampground = async ({
  id,
  campground,
}: {
  id: string
  campground: CampgroundInput
}) => await campgroundsApi.put(`/${id}`, campground)

export const deleteCampground = async (id: string) =>
  await campgroundsApi.delete(`/${id}`)
