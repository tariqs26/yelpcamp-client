import { Link } from "react-router-dom"
import { Card, Col, Image, Row } from "react-bootstrap"
import { fromDate } from "~/lib/utils"
import type { Campground } from "~/types"

export const CampgroundCard = (campground: Readonly<Campground>) => {
  const { _id, title, image, location, description } = campground

  return (
    <Card className="mt-4 overflow-hidden">
      <Row>
        <Col md={4}>
          <Image
            src={image}
            alt={`${title} campground image`}
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
              Posted {fromDate(campground.createdAt)}
            </Card.Subtitle>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
