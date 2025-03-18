import { useInfiniteQuery } from "@tanstack/react-query"
import { getCampgrounds } from "api/campgrounds"

export default function useGetCampgrounds() {
  return useInfiniteQuery({
    queryKey: ["campgrounds"],
    queryFn: getCampgrounds,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      if (pages.length < pages[0].totalPages) return pages.length + 1
    },
  })
}
