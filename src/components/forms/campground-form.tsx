import { useState } from "react"
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap"
import type { Campground } from "~/types"
import { ConditionalWrapper } from "../conditional-wrapper"
import { SubmitButton } from "../submit-button"

type CampgroundFormProps = Readonly<
  {
    handleSubmit: React.FormEventHandler
    isPending: boolean
  } & (
    | { initialData: Campground; leaveHandler: () => void }
    | { initialData?: never; leaveHandler?: never }
  )
>

export const CampgroundForm = (props: CampgroundFormProps) => {
  const { handleSubmit, initialData, isPending, leaveHandler } = props
  const [descChars, setDescChars] = useState(
    initialData?.description.length ?? 0
  )

  const action = initialData ? "Create" : "Update"

  return (
    <Row>
      <ConditionalWrapper
        condition={action === "Create"}
        wrapper={(children) => (
          <Card className="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 border shadow p-3">
            <Card.Body>
              <div className="mb-3 card-title h3">{action} Campground</div>
              {children}
            </Card.Body>
          </Card>
        )}>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              minLength={5}
              maxLength={50}
              placeholder="Misty Meadows"
              defaultValue={initialData?.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              Title must be between 5 and 50 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              minLength={5}
              maxLength={50}
              placeholder="1280 Main St W, Hamilton, ON"
              defaultValue={initialData?.location}
              required
            />
            <Form.Control.Feedback type="invalid">
              Location must be between 5 and 50 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              placeholder="https://source.unsplash.com/collection/483251"
              defaultValue={initialData?.image}
              required
            />
          </Form.Group>
          <Form.Label htmlFor="price">Price</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <InputGroup.Text id="price-label">$</InputGroup.Text>
            <Form.Control
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="0.00"
              defaultValue={initialData?.price}
              aria-describedby="price-label"
              required
            />
            <Form.Control.Feedback type="invalid">
              Price must be greater than or equal to $0.00.
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="A beautiful campground with a creek running through it."
              defaultValue={initialData?.description}
              maxLength={300}
              onChange={(e) => {
                setDescChars(e.target.value.length)
              }}
              rows={4}
              required
            />
            <Form.Control.Feedback type="invalid">
              Description cannot be empty
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {descChars}
              /300 characters
            </Form.Text>
          </Form.Group>
          <div className="d-flex gap-2">
            {action === "Update" && (
              <Button variant="danger" onClick={leaveHandler}>
                Cancel
              </Button>
            )}
            <SubmitButton disabled={isPending}>
              {action} campground
            </SubmitButton>
          </div>
        </Form>
      </ConditionalWrapper>
    </Row>
  )
}
