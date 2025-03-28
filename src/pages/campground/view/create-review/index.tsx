import { Link } from "react-router-dom"
import { Accordion } from "react-bootstrap"
import { ReviewForm } from "~/components/forms/review-form"
import { useAuth } from "~/components/providers/auth"
import { useCreateReview } from "./useCreateReview"

import "./index.css"

type CreateReviewProps = Readonly<{ campgroundId: string }>

export const CreateReview = ({ campgroundId }: CreateReviewProps) => {
  const { user } = useAuth()

  const formProps = useCreateReview(campgroundId, () => {
    const accordionBtn: HTMLButtonElement | null =
      document.querySelector(".accordion-button")
    if (accordionBtn !== null) {
      accordionBtn.click()
    }
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
