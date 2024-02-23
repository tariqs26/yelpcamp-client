import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <Container
      style={{
        paddingTop: "72px",
        paddingBottom: "20px",
      }}>
      <h1>
        404: Not Found{" "}
        <span role="img" aria-label="sad face">
          😢
        </span>
      </h1>
      <p>
        Sorry, the page you are looking for does not exist. Please check the URL
      </p>
      <Link to="/campgrounds" replace>
        Go back to campgrounds
      </Link>
    </Container>
  )
}
