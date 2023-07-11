import { StrictMode, lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AlertApi from "contexts/AlertContext"
import AuthApi from "contexts/AuthContext"
import Home from "pages/home"
import Fallback from "components/Fallback"
import Navbar from "components/navbar"
import Footer from "components/Footer"

const Register = lazy(() => import("pages/auth/register"))
const Login = lazy(() => import("pages/auth/login"))
const Campgrounds = lazy(() => import("pages/campground/main"))
const Campground = lazy(() => import("pages/campground/view"))
const NewCampground = lazy(() => import("pages/campground/create"))
const ProtectedRoute = lazy(() => import("components/Protected"))
const NotFound = lazy(() => import("components/NotFound"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3600 * 24,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthApi>
        <BrowserRouter>
          <AlertApi>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                element={
                  <main className="container position-relative my-4">
                    <Suspense fallback={<Fallback />}>
                      <Outlet />
                    </Suspense>
                  </main>
                }
              >
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
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
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Footer />
          </AlertApi>
        </BrowserRouter>
      </AuthApi>
    </QueryClientProvider>
  </StrictMode>
)
