import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from 'api/reviewsAPI';
import { dataFromInput, handleValidation } from '../../utils';
import { useAlert } from 'contexts/AlertContext';

export default function useCreateReview(cId: string) {
  const queryClient = useQueryClient();
  const { alert } = useAlert();

  const mutate = useMutation({
    mutationFn: createReview,
    onError: (error: Error) => {
      alert(`${error.name}: Failed to create review`, 'danger');
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['campgrounds', cId],
        (oldData: Campground | undefined) => {
          if (oldData) {
            alert('Review created successfully', 'success');
            return {
              ...oldData,
              reviews: [...oldData.reviews, data],
            };
          }
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['campgrounds', cId],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return;
    mutate.mutate({ cId, review: dataFromInput(e.currentTarget) });
    e.currentTarget.classList.remove('was-validated');
    e.currentTarget.reset();
  };

  return {
    handleSubmit,
    loading: mutate.isLoading,
  };
}
