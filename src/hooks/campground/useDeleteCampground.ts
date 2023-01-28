import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCampground } from 'api/campgroundsAPI';
import { useAlert } from 'contexts/AlertContext';

export default function useDeleteCampground() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { alert } = useAlert();

  return useMutation({
    mutationFn: deleteCampground,
    onError: (err: Error) => {
      alert(`${err.message}: Failed to delete campground`, 'danger');
    },
    onSuccess: (_, campgroundId) => {
      queryClient.setQueryData(
        ['campgrounds'],
        (oldData: Pick<Campground, '_id'>[] | undefined) =>
          oldData?.filter(({ _id }) => _id !== campgroundId)
      );
      navigate('/campgrounds', {
        replace: true,
      });
      alert('Campground deleted successfully', 'success');
    },
  });
}
