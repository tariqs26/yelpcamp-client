import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "api/users"
import { toast } from "react-hot-toast"
import { useAuth } from "contexts/AuthContext"
import { dataFromInput, handleValidation } from "lib/utils"

export default function useLoginUser() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const { state } = useLocation()

  useEffect(() => {
    if (state?.from)
      toast.error(`${state?.message || "Please sign in to access this page"}`)
  }, [])

  const mutation = useMutation(loginUser, {
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
    isLoading: mutation.isLoading,
  }
}
