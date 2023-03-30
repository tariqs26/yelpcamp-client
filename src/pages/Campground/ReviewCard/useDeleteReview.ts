import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from 'api/reviewsAPI';
import { useAlert } from 'contexts/AlertContext';

export default function useDeleteCampground(campgroundId: string) {
  const queryClient = useQueryClient();
  const { alert } = useAlert();

  return useMutation({
    mutationFn: deleteReview,
    onError: (error: Error) =>
      alert(`${error.message}: Failed to delete review`, 'danger'),
    onSuccess: (_, { reviewId }) => {
      queryClient.setQueryData(
        ['campgrounds', campgroundId],
        (oldData: Campground | undefined) => {
          if (oldData) {
            alert('Review deleted successfully', 'success');
            return {
              ...oldData,
              reviews: oldData.reviews.filter(({ _id }) => _id !== reviewId),
            };
          }
        }
      );
    },
  });
}
