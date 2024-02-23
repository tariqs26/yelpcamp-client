import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "components/submit-button"
import useRegisterUser from "./useRegisterUser"

export default function Register() {
  const { handleSubmit, isPending } = useRegisterUser()
  return (
    <>
      <div className="mb-3 card-title h3">Create an account</div>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            name="email"
            placeholder="johndoe123@gmail.com"
            required
            type="email"
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            minLength={4}
            maxLength={50}
            placeholder="JohnDoe123"
            required
          />
          <Form.Control.Feedback type="invalid">
            Username must be between 4 and 50 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="••••••••"
            required
            type="password"
            minLength={8}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Button disabled={isPending} variant="success" className="w-100">
          Sign up
        </Button>
        <div className="d-flex justify-content-center gap-1 align-items-center mt-3">
          <span>Have an account?</span>{" "}
          <Link to="/login" className="text-decoration-none">
            Sign in
          </Link>
        </div>
      </Form>
    </>
  )
}
