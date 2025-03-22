import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { logout } from "~/api/auth"
import { useAuth } from "../providers/auth"

export default function useLogoutUser() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: logout,
    retry: false,
    onSuccess: () => {
      setUser(null)
      toast.success("Successfully signed out")
      navigate("/", { replace: true })
    },
    onError: (error: Error) => {
      toast.error(`${error.message}: Failed to sign out`)
    },
  })
}
