import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { deleteCampground } from "api/campgrounds"

export default function useDeleteCampground() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: deleteCampground,
    onError: (err: MutationError) => {
      toast.error(
        `${err.response?.data ?? err.message}: Failed to delete campground`
      )
    },
    onSuccess: (_, campgroundId) => {
      queryClient.setQueryData(["campgrounds"], (old: CampgroundsData) => ({
        ...old,
        pages: old?.pages?.map(page => ({
          ...page,
          campgrounds: page.campgrounds.filter(
            campground => campground._id !== campgroundId
          ),
        })),
      }))
      navigate("/campgrounds", {
        replace: true,
      })
      toast.success("Campground deleted successfully")
    },
  })
}
