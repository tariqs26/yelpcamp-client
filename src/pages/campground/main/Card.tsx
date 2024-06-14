import { Card, Col, Image, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { fromDate } from "lib/utils"

export default function CardComponent(
  props: Campground & { pageIdx?: number }
) {
  const { _id, title, image, location, description } = props
  return (
    <Card className="mt-4 overflow-hidden">
      <Row>
        <Col md={4}>
          <Image
            src={image}
            alt={`${title} campground image`}
            onError={e => {
              const target = e.target as HTMLImageElement
              target.src = "https://via.placeholder.com/640x360"
            }}
            fluid
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              backgroundColor: "rgba(0,0,0,0.5)",
              aspectRatio: "16/9",
            }}
          />
        </Col>
        <Col md={8}>
          <Card.Body className="h-100 d-flex flex-column">
            <Card.Title>{title}</Card.Title>
            <p className="text-muted">{location}</p>
            <Card.Text>{description}</Card.Text>
            <Link
              className="btn btn-primary mb-3"
              to={`/campgrounds/${_id}`}
              style={{ width: "fit-content" }}>
              View {title}
            </Link>
            <Card.Subtitle className="mt-auto text-muted">
              Posted {fromDate(props.createdAt)}
            </Card.Subtitle>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
