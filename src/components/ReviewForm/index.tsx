import useCreateReview from 'hooks/review/useCreateReview';
import { Button, Form } from 'react-bootstrap';

const ReviewForm: React.FC<{ cId: string }> = ({ cId }) => {
  const { handleSubmit, isLoading } = useCreateReview(cId);
  return (
    <>
      <h3>Leave a Review</h3>
      <Form
        onSubmit={handleSubmit}
        noValidate
        onBlur={(e) => {
          const target = e.currentTarget;
          target.classList.remove('was-validated');
        }}
      >
        <Form.Group className='mb-3' controlId='review.rating'>
          <Form.Label>Rating:</Form.Label>
          <Form.Control type='range' name='rating' min='1' max='5' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='review.body'>
          <Form.Label>Review:</Form.Label>
          <Form.Control as='textarea' name='body' rows={3} required />
          <Form.Control.Feedback type='invalid'>
            Review cannot be empty
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='success' type='submit' disabled={isLoading}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ReviewForm;
