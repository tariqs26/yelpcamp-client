import { StrictMode, lazy } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import ReactQueryProvider from "providers/react-query"
import AuthProvider from "providers/auth"
import Home from "pages/home"
import Register from "pages/auth/register"
import Login from "pages/auth/login"
import Footer from "components/footer"
import NavLayout from "layouts/nav-layout"
import SuspenseLayout from "layouts/suspense-layout"
import AuthLayout from "layouts/auth-layout"
import ProtectedRoute from "components/protected"
import NotFound from "components/not-found"

const [Campgrounds, Campground, NewCampground] = [
  lazy(() => import("pages/campground/main")),
  lazy(() => import("pages/campground/view")),
  lazy(() => import("pages/campground/create")),
]

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <StrictMode>
    <Toaster toastOptions={{ duration: 1500 }} />
    <ReactQueryProvider>
      <AuthProvider>
        <BrowserRouter>
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
                    element={
                      <ProtectedRoute
                        message="Please sign in to create a new campground"
                        element={<NewCampground />}
                      />
                    }
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>
)
