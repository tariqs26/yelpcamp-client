import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteReview } from "~/api/reviews"
import type { Campground } from "~/types"

export const useDeleteReview = (campgroundId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteReview,
    onError: (error: Error) =>
      toast.error(`${error.message}: Failed to delete review`),
    onSuccess: (_, { reviewId }) => {
      queryClient.setQueryData(
        ["campgrounds", campgroundId],
        (oldData?: Campground) => {
          if (!oldData) return
          return {
            ...oldData,
            reviews: oldData.reviews.filter(({ _id }) => _id !== reviewId),
          }
        }
      )
      toast.success("Review deleted successfully")
    },
  })
}
