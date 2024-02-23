import { type FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCampground } from "api/campgrounds"
import { toast } from "react-hot-toast"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useUpdateCampground(
  campground: Campground,
  close: () => void,
) {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: updateCampground,
    onError: (err: MutationError) => {
      close()
      toast.error(
        `${err.response?.data ?? err.message}: Failed to update campground`,
      )
    },
    onSuccess: (_, { id, campground: updatedCampground }) => {
      void queryClient.invalidateQueries({
        queryKey: ["campgrounds", id],
      })
      queryClient.setQueryData(["campgrounds"], (old: CampgroundsData) => ({
        ...old,
        pages: old?.pages?.map(page => ({
          ...page,
          campgrounds: page.campgrounds.map(campground =>
            campground._id !== id
              ? campground
              : { ...campground, ...updatedCampground },
          ),
        })),
      }))

      close()
      toast.success("Campground updated successfully")
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
