import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, ListGroup, Row } from "react-bootstrap"

import { fromDate, isAppError } from "~/lib/utils"
import { useDeleteCampground } from "./useDeleteCampground"

import { getCampgroundById } from "~/api/campgrounds"
import { ErrorAlert } from "~/components/error-alert"
import { Fallback } from "~/components/fallback"
import { MapComponent } from "~/components/map"
import { useAuth } from "~/components/providers/auth"
import { SubmitButton } from "~/components/submit-button"
import { CreateReview } from "./create-review"
import { EditCampgroundModal } from "./edit-campground"
import { ReviewCard } from "./view-review"

export default function CampgroundPage() {
  const { id: campgroundId } = useParams() as { id: string }
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const { data: campground, isFetching } = useQuery({
    queryKey: ["campgrounds", campgroundId],
    queryFn: () => getCampgroundById(campgroundId),
  })
  const deleteMutation = useDeleteCampground()

  if (isFetching) return <Fallback />

  if (!campground) return <div>Not found</div>

  if (isAppError(campground))
    return (
      <ErrorAlert
        title={campground.message}
        message={campground.details}
        link={campground.link}
      />
    )

  return (
    <Row>
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 mb-3 offset-lg-0">
        <Card>
          <Card.Img
            src={campground.image}
            variant="top"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              objectFit: "cover",
              objectPosition: "center",
              height: "350px",
            }}
          />
          <Card.Body>
            <Card.Title>{campground.title}</Card.Title>
            <Card.Text className="text-muted">{campground.location}</Card.Text>
            <Card.Text>{campground.description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              ${campground.price.toFixed(2)}
              /night
            </ListGroup.Item>
            <ListGroup.Item>
              Submitted by {campground.author.username}
            </ListGroup.Item>
          </ListGroup>
          {(user?._id === campground.author._id || user?.isAdmin) && (
            <Card.Body className="d-flex gap-2">
              <Button
                variant="warning"
                onClick={() => {
                  setShowModal(true)
                }}>
                Edit
              </Button>
              <SubmitButton
                variant="danger"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  deleteMutation.mutate(campground._id)
                }}>
                Delete
              </SubmitButton>
            </Card.Body>
          )}
          <Card.Footer className="text-muted">
            Updated {fromDate(campground.updatedAt)}
          </Card.Footer>
        </Card>
        <EditCampgroundModal
          showModal={showModal}
          campground={campground}
          closeModal={() => {
            setShowModal(false)
          }}
        />
      </div>
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-0">
        <MapComponent
          coordinates={{
            longitude: campground.geometry.coordinates[0],
            latitude: campground.geometry.coordinates[1],
          }}
          title={campground.title}
          location={campground.location}
        />
        <h4 className="mt-3">Reviews</h4>
        <CreateReview campgroundId={campgroundId} />
        {campground.reviews.map((review) => (
          <ReviewCard
            key={review._id}
            campgroundId={campgroundId}
            review={review}
          />
        ))}
      </div>
    </Row>
  )
}
