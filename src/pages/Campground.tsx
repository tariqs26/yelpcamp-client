import { useState } from 'react';
import useFetchCampground from 'hooks/campground/useFetchCampground';
import useDeleteCampground from 'hooks/campground/useDeleteCampground';
import useDeleteReview from 'hooks/review/useDeleteReview';
import { useAuth } from 'contexts/AuthContext';
import { fromDate, isAppError } from '../utils';

import { Row, Card, ListGroup, Button } from 'react-bootstrap';
import EditCampground from './EditCampground';
import Error from 'components/Error';
import ReviewForm from 'components/ReviewForm';
import { Rating } from 'components/Rating';

export default function Campground() {
  const [modalShow, setModalShow] = useState(false);
  const { data, isFetching, id } = useFetchCampground();
  const mutate = useDeleteCampground();
  const reviewMutate = useDeleteReview(id);
  const { user } = useAuth();

  if (isFetching) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;
  if (isAppError(data)) {
    return (
      <Error
        title={data.message}
        message={data.details}
        link={data.link ?? undefined}
      />
    );
  }

  return (
    <Row>
      <div className='col-6'>
        <Card>
          <Card.Img
            src={data.image}
            variant='top'
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              aspectRatio: '16/9',
            }}
          />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text className='text-muted'>{data.location}</Card.Text>
            <Card.Text>{data.description}</Card.Text>
          </Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item>${data.price.toFixed(2)}/night</ListGroup.Item>
            <ListGroup.Item>Submitted by {data.author.username}</ListGroup.Item>
          </ListGroup>
          {user && user._id === data.author._id && (
            <Card.Body className='d-flex gap-2'>
              <Button variant='warning' onClick={() => setModalShow(true)}>
                Edit
              </Button>
              <Button
                variant='danger'
                disabled={mutate.isLoading}
                onClick={() => mutate.mutate(data._id)}
              >
                {mutate.isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </Card.Body>
          )}
          <Card.Footer className='text-muted'>
            Updated {fromDate(data.updatedAt)}
          </Card.Footer>
        </Card>
        <EditCampground
          showModal={modalShow}
          campground={data}
          closeModal={() => setModalShow(false)}
        />
      </div>
      <div className='col-6'>
        <ReviewForm cId={id} />
        {data.reviews.map((review: Review) => {
          return (
            <Card key={review._id} className='mt-3'>
              <Card.Body>
                <Card.Title>{review.author.username}</Card.Title>
                <Rating
                  rating={review.rating}
                  text={`Rated: ${review.rating}/5`}
                />
                <Card.Text>review: {review.body}</Card.Text>
                {user && user._id === review.author._id && (
                  <Button
                    variant='danger'
                    size='sm'
                    disabled={reviewMutate.isLoading}
                    onClick={() =>
                      reviewMutate.mutate({ id, reviewId: review._id })
                    }
                  >
                    {reviewMutate.isLoading ? 'Deleting...' : 'Delete'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Row>
  );
}
