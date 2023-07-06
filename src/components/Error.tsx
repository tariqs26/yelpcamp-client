import { Link } from "react-router-dom"
import { Alert, Row, Col } from "react-bootstrap"

type Props = {
  title: string
  message: string
  link?: { url: string; text: string }
}
const Error: React.FC<Props> = ({ title, message, link }) => {
  return (
    <Row>
      <Col
        style={{
          maxWidth: "1024px",
          marginInline: "auto",
        }}
      >
        <Alert variant="danger">
          <Alert.Heading>{title}</Alert.Heading>
          <hr />
          <p>{message}</p>
          {link && (
            <div className="d-flex">
              <Link to={link.url} replace={true} className="alert-link">
                {link.text}
              </Link>
            </div>
          )}
        </Alert>
      </Col>
    </Row>
  )
}

export default Error
