import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampground } from 'api/campgroundsAPI';
import { useAlert } from 'contexts/AlertContext';
import { dataFromInput, handleValidation } from '../../utils';

export default function useCreateCampground() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alert } = useAlert();

  const { mutate, isLoading } = useMutation({
    mutationFn: createCampground,
    onError: (err: MutationError) => {
      alert(
        `${err.response?.data || err.message}: Failed to create campground`,
        'danger'
      );
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['campgrounds', data._id], data);
      queryClient.invalidateQueries({ queryKey: ['campgrounds'] });
      navigate(`/campgrounds/${data._id}`, { replace: true });
      alert('Campground created successfully', 'success');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return;
    mutate(dataFromInput(e.currentTarget));
  };

  return { handleSubmit, isLoading };
}
