import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "api/users"
import { useAuth } from "contexts/AuthContext"
import { toast } from "react-hot-toast"

export default function useLogoutUser() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: logoutUser,
    retry: false,
    onSuccess: () => {
      setUser(null)
      toast.success("Successfully signed out")
      navigate("/campgrounds", { replace: true })
    },
    onError: (error: Error) => {
      toast.error(`${error.message}: Failed to sign out`)
    },
  })
}
