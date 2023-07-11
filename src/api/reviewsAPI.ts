import axios from "axios"

const reviewsAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/campgrounds`,
  withCredentials: true,
  timeout: 5000, // 5 seconds
})

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
