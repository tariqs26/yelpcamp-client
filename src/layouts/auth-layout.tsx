import { Outlet } from "react-router-dom"
import { Card } from "react-bootstrap"
import TentImg from "assets/images/auth-image.webp"

export default function AuthLayout() {
  return (
    <div
      className="m-auto p-3 p-sm-4"
      style={{
        width: "min(100%, 450px)",
      }}
    >
      <Card className="border shadow">
        <Card.Img
          variant="top"
          src={TentImg}
          style={{
            height: "250px",
            objectFit: "cover",
          }}
        />
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card>
    </div>
  )
}
