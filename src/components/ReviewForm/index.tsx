import useCreateReview from 'hooks/review/useCreateReview';
import { Button, Form, Card } from 'react-bootstrap';
import { RatingInput } from 'components/Rating';
import Loader from 'components/SubmitLoader';

export default function ReviewForm({ cId }: { cId: string }) {
  const { handleSubmit, isLoading } = useCreateReview(cId);
  return (
    <Card className='mt-3'>
      <Card.Body>
        <Card.Title>Leave a Review</Card.Title>
        <Form
          onSubmit={handleSubmit}
          noValidate
          onBlur={(e) => {
            const target = e.currentTarget;
            target.classList.remove('was-validated');
          }}
        >
          <RatingInput />
          <Form.Group className='mb-3' controlId='review.body'>
            <Form.Label>Review</Form.Label>
            <Form.Control as='textarea' name='body' rows={2} required />
            <Form.Control.Feedback type='invalid'>
              Review cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='success' type='submit' disabled={isLoading}>
            <Loader text='submit' isLoading={isLoading} />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
