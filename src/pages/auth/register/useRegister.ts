import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { register } from "api/users"
import { toast } from "react-hot-toast"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useRegister() {
  const navigate = useNavigate()

  const { isPending, mutate } = useMutation({
    mutationFn: register,
    onSuccess: data => {
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

  return { handleSubmit, isPending }
}
