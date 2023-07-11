import { Link } from "react-router-dom"
import useFetchCampgrounds from "./useFetchCampgrounds"
import Error from "components/Error"
import Card from "./Card"
import LoadingCard, { CardComponent } from "components/LoadingCard"
import ClusterMap from "components/Map/cluster"
import Button from "components/SubmitButton"
import { ErrorDetails } from "types/errors"

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
  if (status === "error" || !data)
    return (
      <Error
        title={(error as Error).message}
        message={ErrorDetails.SERVER_ERROR}
      />
    )
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
          style={{ width: "fit-content" }}
        >
          Add campground
        </Link>
      </header>
      {!data.pages.length ? (
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
          onClick={() => fetchNextPage()}
          notForm
        >
          Load more
        </Button>
      )}
    </>
  )
}