import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchCampgrounds } from "api/campgroundsAPI"

export default function useFetchCampgrounds() {
  return useInfiniteQuery({
    queryKey: ["campgrounds"],
    queryFn: fetchCampgrounds,
    getNextPageParam: (_, pages) => {
      if (pages.length < pages[0].totalPages) return pages.length + 1
      return undefined
    },
  })
}
