import { useLocation } from "react-router-dom"
import LoadingCard from "./loading-card"

export default function Fallback() {
  const { pathname } = useLocation()
  if (pathname.endsWith("campgrounds")) return <LoadingCard />
  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
