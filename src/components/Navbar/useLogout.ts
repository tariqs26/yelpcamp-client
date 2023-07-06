import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "api/usersAPI"
import { useAuth } from "contexts/AuthContext"
import { useAlert } from "contexts/AlertContext"

export default function useLogoutUser() {
  const navigate = useNavigate()
  const { alert } = useAlert()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: logoutUser,
    retry: false,
    onSuccess: () => {
      setUser(undefined)
      alert("Successfully signed out", "success")
      navigate("/campgrounds", { replace: true })
    },
    onError: (error: Error) => {
      alert(`${error.message}: Failed to sign out`, "danger")
    },
  })
}
