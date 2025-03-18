import { axios } from "../lib/axios"

const reviewsAPI = axios("/campgrounds")

export const createReview = async ({
  cId,
  review,
}: {
  cId: string
  review: ReviewInput
}): Promise<Review> =>
  (
    await reviewsAPI.post(`/${cId}/reviews`, {
      ...review,
      rating: Number(review.rating),
    })
  ).data

export const deleteReview = async ({
  id,
  reviewId,
}: {
  id: string
  reviewId: string
}) => await reviewsAPI.delete(`/${id}/reviews/${reviewId}`)

export default reviewsAPI
