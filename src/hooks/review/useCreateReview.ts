import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from 'api/reviewsAPI';
import { dataFromInput, handleValidation } from '../../utils';
import { useAlert } from 'contexts/AlertContext';
import { useNavigate } from 'react-router-dom';

export default function useCreateReview(cId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alert } = useAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: createReview,
    onError: ({ message }: Error) => {
      if (!message.endsWith('401'))
        alert(`${message}: Failed to create review`, 'danger');
      else
        navigate('/login', {
          state: {
            from: window.location.pathname,
            message: 'Please login to create a review',
          },
        });
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
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return;
    mutate({ cId, review: dataFromInput(e.currentTarget) });
    e.currentTarget.classList.remove('was-validated');
    e.currentTarget.reset();
  };

  return { handleSubmit, isLoading };
}
