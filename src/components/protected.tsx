import { Navigate } from "react-router-dom"
import { useAuth } from "providers/auth"

interface Props {
  element: JSX.Element
  message?: string
}

export default function Protected({ element, message }: Props) {
  const { user } = useAuth()

  if (user !== null) return element
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
