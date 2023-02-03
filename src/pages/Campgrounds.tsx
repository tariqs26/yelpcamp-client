import { Link } from 'react-router-dom';
import useFetchCampgrounds from 'hooks/campground/useFetchCampgrounds';
import Error from 'components/Error';
import Card from 'components/Card';
import LoadingCard from 'components/LoadingCard';
import ClusterMap from 'components/Map/cluster';
import { ErrorDetails } from '../@types/Error';

export default function Campgrounds() {
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
      <ClusterMap
        campgrounds={{
          features: data.map(({ geometry }) => ({
            type: 'Feature',
            geometry,
          })),
        }}
      />
      <header className='d-flex justify-content-between flex-column gap-3 align-items-sm-center flex-sm-row align-items-start'>
        <h1 className='mb-0'>All Campgrounds</h1>
        <Link
          className='btn btn-success'
          to='/campgrounds/new'
          style={{ width: 'fit-content' }}
        >
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
}
