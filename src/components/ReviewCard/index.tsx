import { Button, Card } from 'react-bootstrap';
import useDeleteReview from 'hooks/review/useDeleteReview';
import { Rating } from 'components/Rating';
import Loader from 'components/SubmitLoader';

type Props = {
  cId: string;
  review: Review;
  user: AppUser | undefined;
};

export default function ReviewCard({ cId, review, user }: Props) {
  const { mutate, isLoading } = useDeleteReview(cId);
  return (
    <Card className='mt-3'>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <Card.Title>{review.author.username}</Card.Title>
          <Rating rating={review.rating} text={`Rated: ${review.rating}/5`} />
        </div>
        <Card.Text>review: {review.body}</Card.Text>
        {user && user._id === review.author._id && (
          <Button
            variant='danger'
            size='sm'
            disabled={isLoading}
            style={{ minWidth: '3.5rem' }}
            onClick={() => mutate({ id: cId, reviewId: review._id })}
          >
            <Loader text='delete' isLoading={isLoading} />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
