import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Fallback from "components/fallback"

export default function SuspenseLayout() {
  return (
    <Suspense fallback={<Fallback />}>
      <Container style={{
        paddingTop: "72px",
        paddingBottom: "20px"
      }}>
        <Outlet />
      </Container>
    </Suspense>
  )
}
