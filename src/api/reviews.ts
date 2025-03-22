import { axios } from "~/lib/axios"

const reviewsApi = axios("/campgrounds")

export const createReview = async ({
  campgroundId,
  review,
}: {
  campgroundId: string
  review: ReviewInput
}): Promise<Review> =>
  (
    await reviewsApi.post(`/${campgroundId}/reviews`, {
      ...review,
      rating: Number(review.rating),
    })
  ).data

export const deleteReview = async ({
  campgroundId,
  reviewId,
}: {
  campgroundId: string
  reviewId: string
}) => await reviewsApi.delete(`/${campgroundId}/reviews/${reviewId}`)
