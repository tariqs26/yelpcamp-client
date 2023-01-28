import { useParams } from 'react-router-dom';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { fetchCampgroundById } from 'api/campgroundsAPI';

export default function useFetchCampground() {
  const { id } = useParams() as { id: string };
  const queryClient = new QueryClient();

  const query = useQuery({
    queryKey: ['campgrounds', id],
    queryFn: () => fetchCampgroundById(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
    initialData: () =>
      queryClient
        .getQueryData<Campground[] | undefined>(['campgrounds'])
        ?.find(({ _id }) => _id === id),
  });

  return { ...query, id };
}
