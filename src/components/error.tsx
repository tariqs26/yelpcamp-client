import { Link } from "react-router-dom"
import { Alert, Row, Col } from "react-bootstrap"

interface Props {
  title: string
  message: string
  link?: { url: string; text: string }
}
export default function Error({ title, message, link }: Props) {
  return (
    <Row>
      <Col
        style={{
          maxWidth: "1024px",
          marginInline: "auto",
        }}>
        <Alert variant="danger">
          <Alert.Heading>{title}</Alert.Heading>
          <hr />
          <p>{message}</p>
          {link !== undefined && (
            <div className="d-flex">
              <Link to={link.url} replace className="alert-link">
                {link.text}
              </Link>
            </div>
          )}
        </Alert>
      </Col>
    </Row>
  )
}
