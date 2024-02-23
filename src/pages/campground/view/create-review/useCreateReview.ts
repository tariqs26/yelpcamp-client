import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createReview } from "api/reviews"
import { toast } from "react-hot-toast"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useCreateReview(cId: string, close: () => void) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createReview,
    onError: ({ message }: Error) => {
      if (!message.endsWith("401"))
        toast.error(`${message}: Failed to create review`)
      else {
        navigate("/login", {
          state: {
            from: window.location.pathname,
          },
        })
      }
    },
    onSuccess: data => {
      close()
      queryClient.setQueryData(
        ["campgrounds", cId],
        (oldData: Campground | undefined) => {
          if (oldData !== undefined) {
            return {
              ...oldData,
              reviews: [...oldData.reviews, data],
            }
          }
        },
      )
      toast.success("Review created successfully")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate({ cId, review: dataFromInput(e.currentTarget) })
    e.currentTarget.classList.remove("was-validated")
    e.currentTarget.reset()
  }

  return { handleSubmit, isPending }
}
