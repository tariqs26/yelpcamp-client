import Form from "react-bootstrap/Form"
import { RatingInput } from "../rating"
import { SubmitButton } from "../submit-button"

type ReviewFormProps = Readonly<{
  handleSubmit: React.FormEventHandler
  isPending: boolean
}>

export const ReviewForm = (props: ReviewFormProps) => (
  <Form
    onSubmit={props.handleSubmit}
    noValidate
    onBlur={(e) => {
      const target = e.currentTarget
      target.classList.remove("was-validated")
    }}>
    <RatingInput />
    <Form.Group className="mb-3" controlId="review.body">
      <Form.Label>Review</Form.Label>
      <Form.Control as="textarea" name="body" rows={2} required />
      <Form.Control.Feedback type="invalid">
        Review cannot be empty
      </Form.Control.Feedback>
    </Form.Group>
    <SubmitButton variant="success" disabled={props.isPending}>
      submit
    </SubmitButton>
  </Form>
)
