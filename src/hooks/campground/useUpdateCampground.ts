import { FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampground } from 'api/campgroundsAPI';
import { useAlert } from 'contexts/AlertContext';
import { dataFromInput, handleValidation } from '../../utils';

export default function useUpdateCampground(
  campground: Campground,
  close: () => void
) {
  const queryClient = useQueryClient();
  const { alert } = useAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCampground,
    onError: (err: MutationError) => {
      close();
      alert(
        `${err.response?.data || err.message}: Failed to update campground`,
        'danger'
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['campgrounds'],
      });
      close();
      alert('Campground updated successfully', 'success');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return;
    mutate({
      id: campground._id,
      campground: dataFromInput(e.currentTarget),
    });
  };

  return { handleSubmit, isLoading };
}
