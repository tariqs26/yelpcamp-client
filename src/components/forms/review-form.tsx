import Form from "react-bootstrap/Form"
import Button from "components/submit-button"
import { RatingInput } from "components/rating"

export default function ReviewForm({ handleSubmit, isPending }: FormProps) {
  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
      onBlur={e => {
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
      <Button variant="success" disabled={isPending}>
        submit
      </Button>
    </Form>
  )
}
