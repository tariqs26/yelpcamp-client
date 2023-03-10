import useCreateReview from 'hooks/review/useCreateReview';
import { Button, Form, Accordion } from 'react-bootstrap';
import { RatingInput } from 'components/Rating';
import Loader from 'components/SubmitLoader';

import './ReviewForm.css';

export default function ReviewForm({ cId }: { cId: string }) {
  const { handleSubmit, isLoading } = useCreateReview(cId, () => {
    const accordionBtn = document.querySelector(
      '.accordion-button'
    ) as HTMLElement;
    accordionBtn.click();
  });

  return (
    <Accordion className='mt-3'>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          <h5 className='mb-0'>Write a review</h5>
        </Accordion.Header>
        <Accordion.Body>
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
            <Button
              variant='success'
              type='submit'
              style={{ minWidth: '4.75rem' }}
              disabled={isLoading}
            >
              <Loader text='submit' isLoading={isLoading} />
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
