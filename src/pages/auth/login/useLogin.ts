import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { login } from "api/users"
import { useAuth } from "components/providers/auth"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useLogin() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const {
    state,
  }: {
    state?: {
      from?: string
    }
  } = useLocation()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (typeof data === "string") return toast.error(data)
      setUser(data)
      if (state?.from !== undefined) navigate(state.from, { replace: true })
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
