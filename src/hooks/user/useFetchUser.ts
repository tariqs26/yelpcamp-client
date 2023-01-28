import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'api/usersAPI';

export default function useFetchUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    enabled: false,
    retry: false,
  });
}
