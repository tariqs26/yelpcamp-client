import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "api/usersAPI"
import { useAlert } from "contexts/AlertContext"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useRegisterUser() {
  const navigate = useNavigate()
  const { alert } = useAlert()

  const { isLoading, mutate } = useMutation(registerUser, {
    onSuccess: (data) => {
      if (typeof data === "string") return alert(data, "danger")
      alert(`Welcome to YelpCamp ${data.username}!`, "success")
      navigate("/login", { replace: true })
    },
    onError: (error: Error) => {
      alert(`${error.message}: Failed to register user`, "danger")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!handleValidation(e)) return
    mutate(dataFromInput(e.currentTarget))
  }

  return { handleSubmit, isLoading }
}
