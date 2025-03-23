import { Navigate } from "react-router-dom"
import { useAuth } from "./providers/auth"

type RequireAuthProps = Readonly<{
  element: React.ReactElement
  message?: string
}>

export const RequireAuth = ({ element, message }: RequireAuthProps) => {
  const { user } = useAuth()

  if (user) return element

  return (
    <Navigate
      to="/login"
      replace
      state={{
        from: window.location.pathname,
        message,
      }}
    />
  )
}
