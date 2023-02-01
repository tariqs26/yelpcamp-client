import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>
        404: Not Found <span role='img' aria-label='sad face'>😢</span>
      </h1>
      <p>
        Sorry, the page you are looking for does not exist. Please check the URL
      </p>
      <Link to='/campgrounds' replace={true}>
        Go back to campgrounds
      </Link>
    </div>
  );
}
