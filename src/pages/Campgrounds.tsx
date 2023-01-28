import { Link } from 'react-router-dom';
import useFetchCampgrounds from 'hooks/campground/useFetchCampgrounds';
import Error from 'components/Error';
import Card from 'components/Card';
import LoadingCard from 'components/LoadingCard';
import { ErrorDetails } from '../@types/Error';

const Campgrounds = () => {
  const { data, status, error } = useFetchCampgrounds();

  if (status === 'loading') return <LoadingCard />;
  if (status === 'error' || !data)
    return (
      <Error
        title={(error as Error).message}
        message={ErrorDetails.SERVER_ERROR}
      />
    );
  return (
    <>
      <header className='d-flex justify-content-between align-items-center'>
        <h1 className='mb-0'>All Campgrounds</h1>
        <Link className='btn btn-success' to='/campgrounds/new'>
          Add campground
        </Link>
      </header>
      {!data.length ? (
        <h4 className='text-muted mt-4'>No campgrounds available</h4>
      ) : (
        data.map((props: Campground) => <Card key={props._id} {...props} />)
      )}
    </>
  );
};

export default Campgrounds;
