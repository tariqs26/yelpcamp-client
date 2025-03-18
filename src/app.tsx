import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

import Footer from "components/footer"
import AuthLayout from "components/layouts/auth-layout"
import NavLayout from "components/layouts/nav-layout"
import SuspenseLayout from "components/layouts/suspense-layout"
import ProtectedRoute from "components/protected"
import Login from "pages/auth/login"
import Register from "pages/auth/register"
import Home from "pages/home"
import NotFound from "pages/not-found"

import "bootstrap/dist/css/bootstrap.min.css"

const [Campgrounds, Campground, NewCampground] = [
  lazy(async () => await import("pages/campground/main")),
  lazy(async () => await import("pages/campground/view")),
  lazy(async () => await import("pages/campground/create")),
]

export default function App() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<NavLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<SuspenseLayout />}>
            <Route path="/campgrounds">
              <Route index element={<Campgrounds />} />
              <Route path=":id" element={<Campground />} />
            </Route>
            <Route
              path="new-campground"
              element={<ProtectedRoute element={<NewCampground />} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </main>
  )
}
