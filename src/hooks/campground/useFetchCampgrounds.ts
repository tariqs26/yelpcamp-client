import { useQuery } from '@tanstack/react-query';
import { fetchCampgrounds } from 'api/campgroundsAPI';

export default function useFetchCampgrounds() {
  return useQuery({
    queryKey: ['campgrounds'],
    queryFn: fetchCampgrounds,
    select: (data) =>
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
  });
}
