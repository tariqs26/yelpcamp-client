import { useState } from "react"
import { Button, Card, ListGroup, Row } from "react-bootstrap"

import MapComponent from "~/components/Map"
import ErrorAlert from "~/components/error-alert"
import Fallback from "~/components/fallback"
import { useAuth } from "~/components/providers/auth"
import SubmitButton from "~/components/submit-button"
import { fromDate, isAppError } from "~/lib/utils"
import EditCampground from "../edit"
import ReviewForm from "./create-review"
import useDeleteCampground from "./useDeleteCampground"
import useGetCampground from "./useGetCampground"
import ReviewCard from "./view-review"

export default function Campground() {
  const [modalShow, setModalShow] = useState(false)
  const { data, isFetching, id } = useGetCampground()
  const mutate = useDeleteCampground()
  const { user } = useAuth()

  if (isFetching) return <Fallback />

  if (data === undefined) return <div>Not found</div>

  if (isAppError(data))
    return (
      <ErrorAlert
        title={data.message}
        message={data.details}
        link={data.link}
      />
    )

  return (
    <Row>
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 mb-3 offset-lg-0">
        <Card>
          <Card.Img
            src={data.image}
            variant="top"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              objectFit: "cover",
              objectPosition: "center",
              height: "350px",
            }}
          />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text className="text-muted">{data.location}</Card.Text>
            <Card.Text>{data.description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              ${data.price.toFixed(2)}
              /night
            </ListGroup.Item>
            <ListGroup.Item>Submitted by {data.author.username}</ListGroup.Item>
          </ListGroup>
          {user && (user._id === data.author._id || user.isAdmin) && (
            <Card.Body className="d-flex gap-2">
              <Button
                variant="warning"
                onClick={() => {
                  setModalShow(true)
                }}>
                Edit
              </Button>
              <SubmitButton
                variant="danger"
                disabled={mutate.isPending}
                onClick={() => {
                  mutate.mutate(data._id)
                }}>
                Delete
              </SubmitButton>
            </Card.Body>
          )}
          <Card.Footer className="text-muted">
            Updated {fromDate(data.updatedAt)}
          </Card.Footer>
        </Card>
        <EditCampground
          showModal={modalShow}
          campground={data}
          closeModal={() => {
            setModalShow(false)
          }}
        />
      </div>
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-0">
        <MapComponent
          coordinates={{
            longitude: data.geometry.coordinates[0],
            latitude: data.geometry.coordinates[1],
          }}
          title={data.title}
          location={data.location}
        />
        <h4 className="mt-3">Reviews</h4>
        <ReviewForm cId={id} user={user} />
        {data.reviews.map((review: Review) => (
          <ReviewCard key={review._id} cId={id} review={review} user={user} />
        ))}
      </div>
    </Row>
  )
}
