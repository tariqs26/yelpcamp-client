import { Row, Col, Card, Placeholder } from "react-bootstrap"

export default function LoadingCard() {
  return (
    <>
      <Placeholder
        style={{
          height: "min(50vh, 400px)",
          width: "100%",
          marginBottom: "1rem",
          borderRadius: "calc(0.375rem - 1px)",
          animation: "placeholder-glow 2s ease-in-out infinite",
        }}
      />
      <header className="d-flex justify-content-between flex-column gap-3 align-items-sm-center flex-sm-row align-items-start">
        <h1 className="mb-0">All Campgrounds</h1>
        <Placeholder.Button variant="success">
          Add campground
        </Placeholder.Button>
      </header>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <CardComponent key={i} />
        ))}
    </>
  )
}

export const CardComponent = () => {
  return (
    <Card className="mt-4 overflow-hidden">
      <Row>
        <Col md={4}>
          <Placeholder
            style={{
              height: "100%",
              width: "100%",
              aspectRatio: "16/9",
              animation: "placeholder-glow 2s ease-in-out infinite",
            }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} className="rounded" />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={4} className="rounded" />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder className="w-100 rounded" />
              <Placeholder className="w-100 rounded" />
              <Placeholder className="w-75 rounded" />
            </Placeholder>
            <Placeholder.Button className="w-25" />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
