import { StrictMode, lazy } from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Footer from "components/footer"
import AuthLayout from "components/layouts/auth-layout"
import NavLayout from "components/layouts/nav-layout"
import SuspenseLayout from "components/layouts/suspense-layout"
import ProtectedRoute from "components/protected"
import AuthProvider from "components/providers/auth"
import ReactQueryProvider from "components/providers/react-query"
import ScrollToTop from "components/scroll-to-top"
import Login from "pages/auth/login"
import Register from "pages/auth/register"
import Home from "pages/home"
import NotFound from "pages/not-found"

const [Campgrounds, Campground, NewCampground] = [
  lazy(async () => await import("pages/campground/main")),
  lazy(async () => await import("pages/campground/view")),
  lazy(async () => await import("pages/campground/create")),
]

// biome-ignore lint/style/noNonNullAssertion: root is always present
const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <StrictMode>
    <Toaster toastOptions={{ duration: 1500 }} />
    <ReactQueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
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
        </BrowserRouter>
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>
)
