import { useQuery } from '@tanstack/react-query';
import { fetchCampgrounds } from 'api/campgroundsAPI';

export default function useFetchCampgrounds() {
  return useQuery({
    queryKey: ['campgrounds'],
    queryFn: fetchCampgrounds,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60000,
  });
}
