import Card from "react-bootstrap/Card"
import { Rating } from "components/rating"
import Button from "components/submit-button"
import useDeleteReview from "./useDeleteReview"

interface Props {
  cId: string
  review: Review
  user: AppUser | null
}

export default function ReviewCard({ cId, review, user }: Props) {
  const { mutate, isPending } = useDeleteReview(cId)
  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">{review.author.username}</Card.Title>
          <Rating rating={review.rating} text={`Rated: ${review.rating}/5`} />
        </div>
        <Card.Text>{review.body}</Card.Text>
        {user !== null && user._id === review.author._id && (
          <Button
            variant="danger"
            size="sm"
            disabled={isPending}
            onClick={() => {
              mutate({ id: cId, reviewId: review._id })
            }}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
