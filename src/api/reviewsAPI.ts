import axios from 'axios';

const reviewsAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createReview = async ({
  cId,
  review,
}: {
  cId: string;
  review: ReviewInput;
}): Promise<Review> => {
  return (await reviewsAPI.post(`/campgrounds/${cId}/reviews`, review)).data;
};

export const deleteReview = async ({
  id,
  reviewId,
}: {
  id: string;
  reviewId: string;
}) => await reviewsAPI.delete(`/campgrounds/${id}/reviews/${reviewId}`);

export default reviewsAPI;
