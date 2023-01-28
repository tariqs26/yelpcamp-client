import { Link } from 'react-router-dom';
import { Card, Row, Col, Image } from 'react-bootstrap';

const CardComponent: React.FC<Campground> = (props) => {
  const { _id, title, image, location, description } = props;
  return (
    <Card className='mt-4 overflow-hidden'>
      <Row>
        <Col md={5}>
          <Image
            src={image}
            alt={`${title} campground image`}
            fluid
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              backgroundColor: 'rgba(0,0,0,0.5)',
              aspectRatio: '16/9',
            }}
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p className='text-muted'>{location}</p>
            <Card.Text>{description}</Card.Text>
            <Link className='btn btn-primary' to={`/campgrounds/${_id}`}>
              View {title}
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CardComponent;
