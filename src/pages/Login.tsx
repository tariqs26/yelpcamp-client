import { Link } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import useLoginUser from 'hooks/user/useLoginUser';

export default function Login() {
  const { handleSubmit, isLoading } = useLoginUser();

  return (
    <>
      <Row>
        <h1 className='text-center mb-3'>Login</h1>
        <Form
          noValidate
          onSubmit={handleSubmit}
          className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 border rounded p-3'
        >
          <Form.Group className='mb-3' controlId='username'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              name='username'
              placeholder='JohnDoe123'
              required
              autoFocus
            />
            <Form.Control.Feedback type='invalid'>
              Enter a valid username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name='password'
              placeholder='••••••••'
              required
              type='password'
            />
          </Form.Group>
          <Button
            type='submit'
            variant='success'
            className='me-2'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
          <Link
            to='/register'
            className='d-block text-center text-decoration-none'
          >
            Don't have an account? Register here.
          </Link>
        </Form>
      </Row>
    </>
  );
}
