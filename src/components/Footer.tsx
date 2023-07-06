import { useLocation } from "react-router-dom"

export default function Footer() {
  const { pathname } = useLocation()
  if (pathname.endsWith("campgrounds"))
    return (
      <footer className="footer bg-dark py-3 px-4 mt-auto">
        <span className="text-muted">&copy; YelpCamp 2023 </span>
      </footer>
    )
  return null
}
