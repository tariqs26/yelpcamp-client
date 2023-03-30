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
    onError: (err: MutationError) => {
      alert(
        `${err.response?.data || err.message}: Failed to delete campground`,
        'danger'
      );
    },
    onSuccess: (_, campgroundId) => {
      queryClient.setQueryData(['campgrounds'], (old: CampgroundsData) => {
        return {
          ...old,
          pages: old?.pages?.map((page) => {
            return {
              ...page,
              campgrounds: page.campgrounds.filter(
                (campground) => campground._id !== campgroundId
              ),
            };
          }),
        };
      });
      navigate('/campgrounds', {
        replace: true,
      });
      alert('Campground deleted successfully', 'success');
    },
  });
}
