import { Card, Row } from 'react-bootstrap';
import TentImg from 'assets/images/zach-betten-K9olx8OF36A-unsplash.jpg';

export default function UserFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Row className='px-3'>
      <Card
        className='border shadow'
        style={{
          width: 'min(100%, 450px)',
          margin: 'auto',
          padding: '0',
        }}
      >
        <Card.Img
          variant='top'
          src={TentImg}
          style={{
            height: '250px',
            objectFit: 'cover',
          }}
        />
        <Card.Body>{children}</Card.Body>
      </Card>
    </Row>
  );
}
