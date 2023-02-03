import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertApi from 'contexts/AlertContext';
import AuthApi from 'contexts/AuthContext';
import Home from 'pages/Home';
import Fallback from 'components/Fallback';
import Navbar from 'components/Navbar';

const Register = lazy(() => import('pages/Register'));
const Login = lazy(() => import('pages/Login'));
const Campgrounds = lazy(() => import('pages/Campgrounds'));
const Campground = lazy(() => import('pages/Campground'));
const NewCampground = lazy(() => import('pages/NewCampground'));
const ProtectedRoute = lazy(() => import('routes/ProtectedRoute'));
const NotFound = lazy(() => import('pages/NotFound'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthApi>
        <BrowserRouter>
          <AlertApi>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/campgrounds'>
                  <Route index element={<Campgrounds />} />
                  <Route path=':id' element={<Campground />} />
                  <Route
                    path='new'
                    element={
                      <ProtectedRoute
                        message='You must be signed in to create a new campground'
                        element={<NewCampground />}
                      />
                    }
                  />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </AlertApi>
        </BrowserRouter>
      </AuthApi>
    </QueryClientProvider>
  </StrictMode>
);
