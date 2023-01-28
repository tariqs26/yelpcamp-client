import { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, InputGroup } from 'react-bootstrap';

type FormProps = {
  handleSubmit: FormEventHandler;
  isLoading: boolean;
  leaveHandler?: () => void;
  initialData?: Campground;
  prefix: [string | null, string];
};

const FormComponent: React.FC<FormProps> = (props) => {
  const { handleSubmit, leaveHandler, initialData, prefix, isLoading } = props;
  return (
    <Row>
      {prefix[0] && (
        <h1 className='text-center mb-3'>{prefix[0]} Campground</h1>
      )}
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={
          prefix[0]
            ? 'col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 border rounded p-3'
            : ''
        }
      >
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            name='title'
            minLength={5}
            maxLength={50}
            placeholder='Misty Meadows'
            defaultValue={initialData?.title}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Title must be between 5 and 50 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='location'>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            name='location'
            minLength={5}
            maxLength={50}
            placeholder='1234 Main St.'
            defaultValue={initialData?.location}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Location must be between 5 and 50 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='image'>
          <Form.Label>Image URL:</Form.Label>
          <Form.Control
            name='image'
            placeholder='https://source.unsplash.com/collection/483251'
            defaultValue={initialData?.image}
            required
          />
        </Form.Group>
        <Form.Label htmlFor='price'>Price:</Form.Label>
        <InputGroup className='mb-3' hasValidation>
          <InputGroup.Text id='price-label'>$</InputGroup.Text>
          <Form.Control
            type='number'
            name='price'
            min='0'
            step='0.01'
            placeholder='0.00'
            defaultValue={initialData?.price}
            aria-describedby='price-label'
            required
          />
          <Form.Control.Feedback type='invalid'>
            Price must be greater than or equal to $0.00.
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Group className='mb-3'>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as='textarea'
            name='description'
            placeholder='A beautiful campground with a creek running through it.'
            defaultValue={initialData?.description}
            maxLength={200}
            rows={3}
            required
          />
          <Form.Control.Feedback type='invalid'>
            Description cannot be empty
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type='submit'
          variant='success'
          disabled={isLoading}
          className='me-2'
        >
          {isLoading
            ? `${prefix[1].slice(0, -1)}ing...`
            : `${prefix[1]} Campground`}
        </Button>
        {leaveHandler ? (
          <Button variant='danger' onClick={leaveHandler}>
            Cancel
          </Button>
        ) : (
          <Link to='..' replace>
            Back to Campgrounds
          </Link>
        )}
      </Form>
    </Row>
  );
};

export default FormComponent;
