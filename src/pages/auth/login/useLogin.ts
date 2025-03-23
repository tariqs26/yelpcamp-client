import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { login } from "~/api/auth"
import { ERROR_DETAILS } from "~/lib/constants"
import { dataFromInput, handleValidation } from "~/lib/utils"
import { useAuth } from "~/components/providers/auth"

export const useLogin = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const {
    state,
  }: {
    state?: { from?: string }
  } = useLocation()

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(
        isAxiosError(error) && error.code !== "ERR_NETWORK"
          ? ERROR_DETAILS.INVALID_CREDENTIALS
          : ERROR_DETAILS.SERVER_ERROR
      )
    },
    onSuccess: (data) => {
      if (typeof data === "string") return toast.error(data)
      setUser(data)
      if (state?.from) navigate(state.from, { replace: true })
      else navigate("/campgrounds", { replace: true })
      toast.success("Successfully signed in!")
    },
  })

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      if (!handleValidation(e)) return
      mutation.mutate(dataFromInput(e.currentTarget))
    },
    isPending: mutation.isPending,
  }
}
