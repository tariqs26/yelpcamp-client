import { FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCampground } from "api/campgrounds"
import { useAlert } from "contexts/AlertContext"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useUpdateCampground(
  campground: Campground,
  close: () => void
) {
  const queryClient = useQueryClient()
  const { alert } = useAlert()

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCampground,
    onError: (err: MutationError) => {
      close()
      alert(
        `${err.response?.data || err.message}: Failed to update campground`,
        "danger"
      )
    },
    onSuccess: (_, { id, campground: updatedCampground }) => {
      queryClient.invalidateQueries({
        queryKey: ["campgrounds", id],
      })
      queryClient.setQueryData(["campgrounds"], (old: CampgroundsData) => {
        return {
          ...old,
          pages: old?.pages?.map((page) => {
            return {
              ...page,
              campgrounds: page.campgrounds.map((campground) =>
                campground._id !== id
                  ? campground
                  : { ...campground, ...updatedCampground }
              ),
            }
          }),
        }
      })

      close()
      alert("Campground updated successfully", "success")
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate({
      id: campground._id,
      campground: dataFromInput(e.currentTarget),
    })
  }

  return { handleSubmit, isLoading }
}
