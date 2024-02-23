import { Link } from "react-router-dom"
import Error from "components/error"
import LoadingCard, { CardComponent } from "components/loading-card"
import ClusterMap from "components/Map/cluster"
import Button from "components/submit-button"
import ErrorDetails from "types/errors"
import Card from "./Card"
import useFetchCampgrounds from "./useFetchCampgrounds"

export default function Campgrounds() {
  const {
    data,
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
  } = useFetchCampgrounds()

  if (status === "loading" || isRefetching) return <LoadingCard />
  if (status === "error" || data === undefined) {
    return (
      <Error
        title={(error as Error).message}
        message={ErrorDetails.SERVER_ERROR}
      />
    )
  }
  return (
    <>
      <ClusterMap
        campgrounds={{
          features: data.pages
            .flatMap(({ campgrounds }) => campgrounds)
            .map(({ geometry }) => ({
              type: "Feature",
              geometry,
            })),
        }}
      />
      <header className="d-flex justify-content-between flex-column gap-3 align-items-sm-center flex-sm-row align-items-start">
        <h1 className="mb-0">All Campgrounds</h1>
        <Link
          className="btn btn-success"
          to="/new-campground"
          style={{ width: "fit-content" }}>
          Add campground
        </Link>
      </header>
      {data.pages.length === 0 ? (
        <h4 className="text-muted mt-4">No campgrounds available</h4>
      ) : (
        data.pages
          .flatMap(({ campgrounds }) => campgrounds)
          .map((props: Campground) => <Card key={props._id} {...props} />)
      )}
      {isFetchingNextPage &&
        Array(5)
          .fill(0)
          .map((_, i) => <CardComponent key={i} />)}
      {hasNextPage && (
        <Button
          variant="secondary mt-4"
          disabled={isFetchingNextPage}
          onClick={fetchNextPage}>
          Load more
        </Button>
      )}
    </>
  )
}
