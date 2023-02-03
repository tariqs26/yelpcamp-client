import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useLoginUser from 'hooks/user/useLoginUser';
import UserFormWrapper from 'components/UserFormWrapper';
import Loader from 'components/SubmitLoader';

export default function Login() {
  const { handleSubmit, isLoading } = useLoginUser();

  return (
    <UserFormWrapper>
      <div className='mb-3 card-title h3'>Sign in </div>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
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
          <Form.Label>Password</Form.Label>
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
          disabled={isLoading}
          className='w-100'
        >
          <Loader text='Sign in' isLoading={isLoading} />
        </Button>
        <div className='d-flex justify-content-center gap-1 align-items-center mt-3'>
          <span>Don't have an account?</span>{' '}
          <Link to='/register' className='text-decoration-none'>
            Sign up
          </Link>
        </div>
      </Form>
    </UserFormWrapper>
  );
}
