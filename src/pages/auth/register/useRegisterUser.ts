import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "api/users"
import { toast } from "react-hot-toast"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useRegisterUser() {
  const navigate = useNavigate()

  const { isLoading, mutate } = useMutation(registerUser, {
    onSuccess: (data) => {
      if (typeof data === "string") return toast.error(data)
      navigate("/login", { replace: true })
      toast.success(`Welcome to YelpCamp ${data.username}!`)
    },
    onError: (error: Error) => {
      toast.error(`${error.message}: Failed to register user`)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate(dataFromInput(e.currentTarget))
  }

  return { handleSubmit, isLoading }
}
