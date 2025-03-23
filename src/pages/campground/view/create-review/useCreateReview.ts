import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { createReview } from "~/api/reviews"
import { dataFromInput, handleValidation } from "~/lib/utils"
import type { Campground } from "~/types"

export const useCreateReview = (campgroundId: string, close: () => void) => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createReview,
    onError: ({ message }: Error) => {
      if (!message.endsWith("401"))
        toast.error(`${message}: Failed to create review`)
      else {
        navigate("/login", { state: { from: location.pathname } })
      }
    },
    onSuccess: (data) => {
      close()
      queryClient.setQueryData(
        ["campgrounds", campgroundId],
        (oldData?: Campground) => {
          if (!oldData) return
          return { ...oldData, reviews: [...oldData.reviews, data] }
        }
      )
      toast.success("Review created successfully")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate({ campgroundId, review: dataFromInput(e.currentTarget) })
    e.currentTarget.classList.remove("was-validated")
    e.currentTarget.reset()
  }

  return { handleSubmit, isPending }
}
