import { Link } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import useRegisterUser from 'hooks/user/useRegisterUser';

export default function Register() {
  const { handleSubmit, isLoading } = useRegisterUser();
  return (
    <>
      <Row>
        <h1 className='text-center mb-3'>Register</h1>
        <Form
          noValidate
          onSubmit={handleSubmit}
          className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 border rounded p-3'
        >
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              autoFocus
              name='email'
              placeholder='johndoe123@gmail.com'
              required
              type='email'
            />
            <Form.Control.Feedback type='invalid'>
              Enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              name='username'
              minLength={4}
              maxLength={50}
              placeholder='JohnDoe123'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Username must be between 4 and 50 characters.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name='password'
              placeholder='••••••••'
              required
              type='password'
              minLength={8}
            />
            <Form.Control.Feedback type='invalid'>
              Password must be at least 8 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type='submit'
            disabled={isLoading}
            variant='success'
            className='me-2'
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
          <Link
            to='/login'
            className='d-block text-center text-decoration-none'
          >
            Already have an account? Login
          </Link>
        </Form>
      </Row>
    </>
  );
}
