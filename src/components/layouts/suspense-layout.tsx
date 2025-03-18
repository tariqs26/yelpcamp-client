import { Suspense } from "react"
import Container from "react-bootstrap/Container"
import { Outlet } from "react-router-dom"
import Fallback from "../fallback"

export default function SuspenseLayout() {
  return (
    <Suspense fallback={<Fallback />}>
      <Container style={{ paddingTop: "72px", paddingBottom: "20px" }}>
        <Outlet />
      </Container>
    </Suspense>
  )
}
