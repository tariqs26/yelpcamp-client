import "./coin-flip.min.css"
import "./basic.min.css"

type Props = {
  rating: number
  text?: string
}

export const Rating = ({ rating, text }: Props) => (
  <p className="starability-result mb-0" data-rating={rating}>
    {text}
  </p>
)

export const RatingInput = () => (
  <fieldset
    className="starability-coinFlip mb-3"
    style={{
      minHeight: "fit-content",
    }}
  >
    <input
      type="radio"
      id="no-rate"
      className="input-no-rate"
      name="rating"
      value="1"
      defaultChecked
      aria-label="No rating."
    />
    <input type="radio" id="first-rate1" name="rating" value="1" />
    <label htmlFor="first-rate1" title="Terrible">
      1 star
    </label>
    <input type="radio" id="first-rate2" name="rating" value="2" />
    <label htmlFor="first-rate2" title="Not good">
      2 stars
    </label>
    <input type="radio" id="first-rate3" name="rating" value="3" />
    <label htmlFor="first-rate3" title="Average">
      3 stars
    </label>
    <input type="radio" id="first-rate4" name="rating" value="4" />
    <label htmlFor="first-rate4" title="Very good">
      4 stars
    </label>
    <input type="radio" id="first-rate5" name="rating" value="5" />
    <label htmlFor="first-rate5" title="Amazing">
      5 stars
    </label>
  </fieldset>
)
