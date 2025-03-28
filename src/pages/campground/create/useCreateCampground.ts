import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { createCampground } from "~/api/campgrounds"
import { dataFromInput, handleValidation } from "~/lib/utils"
import type { MutationError } from "~/types"

export const useCreateCampground = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createCampground,
    onError: (err: MutationError) => {
      toast.error(
        `${err.response?.data ?? err.message}: Failed to create campground`
      )
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["campgrounds", data._id], data)
      queryClient.invalidateQueries({ queryKey: ["campgrounds"] })
      navigate(`/campgrounds/${data._id}`, { replace: true })
      toast.success("Campground created successfully")
    },
  })

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      if (!handleValidation(e)) return
      mutate(dataFromInput(e.currentTarget))
    },
    isPending,
  }
}
