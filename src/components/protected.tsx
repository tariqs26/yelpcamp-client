import { Navigate } from "react-router-dom"
import { useAuth } from "components/providers/auth"

type Props = Readonly<{ element: JSX.Element; message?: string }>

export default function Protected({ element, message }: Props) {
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
