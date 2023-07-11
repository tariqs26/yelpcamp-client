import { Link } from "react-router-dom"
import useCreateReview from "./useCreateReview"
import { Accordion } from "react-bootstrap"
import ReviewForm from "components/forms/review-form"
import "./index.css"

type Props = {
  cId: string
  user?: AppUser
}

export default function CreateReview({ cId, user }: Props) {
  const formProps = useCreateReview(cId, () => {
    const accordionBtn = document.querySelector(
      ".accordion-button"
    ) as HTMLElement
    accordionBtn.click()
  })

  return (
    <Accordion className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h5 className="mb-0">Write a review</h5>
        </Accordion.Header>
        <Accordion.Body>
          {!user && (
            <p className="text-muted">
              Please <Link to="/login">sign in</Link> to write a review
            </p>
          )}
          <ReviewForm {...formProps} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
