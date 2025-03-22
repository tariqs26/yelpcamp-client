import { Card } from "react-bootstrap"
import { Navigate, Outlet } from "react-router-dom"
import authImage from "~/assets/images/auth-image.webp"
import { useAuth } from "../providers/auth"

export default function AuthLayout() {
  const { user } = useAuth()

  if (user) return <Navigate to="/campgrounds" replace />

  return (
    <div className="m-auto p-3 p-sm-4" style={{ width: "min(100%, 450px)" }}>
      <Card className="border shadow">
        <Card.Img
          src={authImage}
          style={{ height: "250px", objectFit: "cover" }}
          variant="top"
        />
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  )
}
