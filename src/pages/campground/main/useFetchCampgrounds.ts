import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchCampgrounds } from "api/campgrounds"

export default function useFetchCampgrounds() {
  return useInfiniteQuery({
    queryKey: ["campgrounds"],
    queryFn: fetchCampgrounds,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      if (pages.length < pages[0].totalPages) return pages.length + 1
      return undefined
    },
  })
}
