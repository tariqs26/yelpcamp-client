import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "api/users"
import { useAlert } from "contexts/AlertContext"
import { useAuth } from "contexts/AuthContext"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useLoginUser() {
  const navigate = useNavigate()
  const { alert } = useAlert()
  const { setUser } = useAuth()
  const { state } = useLocation()

  useEffect(() => {
    if (state?.from)
      alert(
        `${state?.message || "Please sign in to access this page"}`,
        "danger"
      )
  }, [])

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (typeof data === "string") return alert(data, "danger")
      setUser(data)
      if (state?.from) navigate(state.from, { replace: true })
      else navigate("/campgrounds", { replace: true })
      alert("Successfully signed in in!", "success")
    },
  })

  return {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      if (!handleValidation(e)) return
      mutation.mutate(dataFromInput(e.currentTarget))
    },
    isLoading: mutation.isLoading,
  }
}
