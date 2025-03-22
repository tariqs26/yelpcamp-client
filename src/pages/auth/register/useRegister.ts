import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { register } from "~/api/auth"
import { ERROR_DETAILS } from "~/lib/constants"
import { dataFromInput, handleValidation } from "~/lib/utils"

export default function useRegister() {
  const navigate = useNavigate()

  const { isPending, mutate } = useMutation({
    mutationFn: register,
    onError: (error) => {
      toast.error(
        isAxiosError(error) && error.code !== "ERR_NETWORK"
          ? error.response?.data
          : ERROR_DETAILS.SERVER_ERROR
      )
    },
    onSuccess: (data) => {
      navigate("/login", { replace: true })
      toast.success(`Welcome to YelpCamp ${data.username}!`)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate(dataFromInput(e.currentTarget))
  }

  return { handleSubmit, isPending }
}
