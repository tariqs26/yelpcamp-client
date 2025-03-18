import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getCampgroundById } from "../../../api/campgrounds"
export default function useGetCampground() {
  const { id } = useParams() as { id: string }

  const query = useQuery({
    queryKey: ["campgrounds", id],
    queryFn: async () => await getCampgroundById(id),
  })

  return { ...query, id }
}
