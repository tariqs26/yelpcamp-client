import Card from "react-bootstrap/Card"
import { useAuth } from "~/components/providers/auth"
import { Rating } from "~/components/rating"
import Button from "~/components/submit-button"
import useDeleteReview from "./useDeleteReview"

type ReviewCardProps = Readonly<{ campgroundId: string; review: Review }>

export default function ReviewCard({ campgroundId, review }: ReviewCardProps) {
  const { user } = useAuth()
  const { mutate, isPending } = useDeleteReview(campgroundId)

  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">{review.author.username}</Card.Title>
          <Rating rating={review.rating} text={`Rated: ${review.rating}/5`} />
        </div>
        <Card.Text>{review.body}</Card.Text>
        {user?._id === review.author._id && (
          <Button
            variant="danger"
            size="sm"
            disabled={isPending}
            onClick={() => {
              mutate({ campgroundId, reviewId: review._id })
            }}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
