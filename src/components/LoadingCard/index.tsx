import { Row, Col, Card, Placeholder } from 'react-bootstrap';

export default function LoadingCard() {
  return (
    <>
      <header className='d-flex justify-content-between align-items-center'>
        <h1 className='mb-0'>All Campgrounds</h1>
        <Placeholder.Button variant='success'>
          Add campground
        </Placeholder.Button>
      </header>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <CardComponent key={i} />
        ))}
    </>
  );
}

const CardComponent = () => {
  return (
    <Card className='mt-4 overflow-hidden'>
      <Row>
        <Col md={5}>
          <Placeholder
            style={{
              height: '100%',
              width: '100%',
              aspectRatio: '16/9',
              animation: 'placeholder-glow 2s ease-in-out infinite',
            }}
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Placeholder as={Card.Title} animation='glow'>
              <Placeholder xs={6} className='rounded' />
            </Placeholder>
            <Placeholder as='p' animation='glow'>
              <Placeholder xs={4} className='rounded' />
            </Placeholder>
            <Placeholder as={Card.Text} animation='glow'>
              <Placeholder className='w-100 rounded' />
              <Placeholder className='w-100 rounded' />
              <Placeholder className='w-75 rounded' />
            </Placeholder>
            <Placeholder.Button className='w-25' />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
