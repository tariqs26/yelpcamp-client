import { NavLink } from "react-router-dom"
import { Card } from "react-bootstrap"
import homeImage from "~/assets/images/home-image.webp"
import "./index.css"

export default function HomePage() {
  return (
    <div
      className="cover-container d-flex flex-grow-1 flex-column w-100 p-sm-3 bg-dark text-white justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}>
      <div className="image-cover" />
      <main className="main">
        <div>
          <h1>Welcome to YelpCamp!</h1>
          <p className="lead">
            Jump right in and explore our many campgrounds.
            <br />
            Feel free to share some of your own and review the ones you have
            visited.
          </p>
          <p className="lead">
            <NavLink
              to="/campgrounds"
              className="cover-btn btn btn-secondary border-white bg-white text-dark fw-bold">
              View Campgrounds
            </NavLink>
          </p>
        </div>
        <div className="cards">
          <Card bg="dark" text="white" about="View campgrounds">
            <Card.Body>
              <Card.Title>View campgrounds</Card.Title>
              <Card.Text>
                Browse through our hand-picked campgrounds from all over the
                world.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title>Share your campground</Card.Title>
              <Card.Text>
                Share your campground with the world and help others find their
                next adventure.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title>Leave a review</Card.Title>
              <Card.Text>
                Leave a review for campgrounds you have visited and help others
                find the best places to camp.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </main>
    </div>
  )
}
