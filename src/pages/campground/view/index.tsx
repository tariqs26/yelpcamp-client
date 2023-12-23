import { useState } from "react"
import useFetchCampground from "./useFetchCampground"
import useDeleteCampground from "./useDeleteCampground"
import { useAuth } from "providers/auth"
import { fromDate, isAppError } from "lib/utils"

import { Row, Card, ListGroup, Button } from "react-bootstrap"
import EditCampground from "../edit"
import Error from "components/error"
import SubmitButton from "components/submit-button"
import Map from "components/Map"
import ReviewForm from "./create-review"
import ReviewCard from "./view-review"
import Fallback from "components/fallback"

export default function Campground() {
  const [modalShow, setModalShow] = useState(false)
  const { data, isFetching, id } = useFetchCampground()
  const mutate = useDeleteCampground()
  const { user } = useAuth()

  if (isFetching) return <Fallback />

  if (!data) return <div>Not found</div>

  if (isAppError(data))
    return (
      <Error title={data.message} message={data.details} link={data.link} />
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
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "https://via.placeholder.com/640x360"
            }}
          />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text className="text-muted">{data.location}</Card.Text>
            <Card.Text>{data.description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>${data.price.toFixed(2)}/night</ListGroup.Item>
            <ListGroup.Item>Submitted by {data.author.username}</ListGroup.Item>
          </ListGroup>
          {user && (user._id === data.author._id || user.isAdmin) && (
            <Card.Body className="d-flex gap-2">
              <Button variant="warning" onClick={() => setModalShow(true)}>
                Edit
              </Button>
              <SubmitButton
                variant="danger"
                disabled={mutate.isLoading}
                onClick={() => mutate.mutate(data._id)}
              >
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
          closeModal={() => setModalShow(false)}
        />
      </div>
      <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-0">
        <Map
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
