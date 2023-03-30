import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCampgroundById } from 'api/campgroundsAPI';

export default function useFetchCampground() {
  const { id } = useParams() as { id: string };

  const query = useQuery({
    queryKey: ['campgrounds', id],
    queryFn: () => fetchCampgroundById(id),
  });

  return { ...query, id };
}
