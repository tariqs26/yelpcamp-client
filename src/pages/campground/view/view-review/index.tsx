import Card from "react-bootstrap/Card"
import type { Review } from "~/types"
import { useDeleteReview } from "./useDeleteReview"
import { useAuth } from "~/components/providers/auth"
import { Rating } from "~/components/rating"
import { SubmitButton } from "~/components/submit-button"

type ReviewCardProps = Readonly<{ campgroundId: string; review: Review }>

export const ReviewCard = ({ campgroundId, review }: ReviewCardProps) => {
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
          <SubmitButton
            variant="danger"
            size="sm"
            disabled={isPending}
            onClick={() => {
              mutate({ campgroundId, reviewId: review._id })
            }}>
            Delete
          </SubmitButton>
        )}
      </Card.Body>
    </Card>
  )
}
