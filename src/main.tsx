import { StrictMode, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertApi from 'contexts/AlertContext';
import AuthApi from 'contexts/AuthContext';
import Fallback from 'components/Fallback';

const Register = lazy(() => import('pages/Register'));
const Login = lazy(() => import('pages/Login'));
const Campgrounds = lazy(() => import('pages/Campgrounds'));
const Campground = lazy(() => import('pages/Campground'));
const NewCampground = lazy(() => import('pages/NewCampground'));
const ProtectedRoute = lazy(() => import('routes/ProtectedRoute'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={new QueryClient()}>
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
                  element={<ProtectedRoute element={<NewCampground />} />}
                />
              </Route>
              <Route
                path='*'
                element={
                  <div>
                    <h1>404</h1>
                    <p>Page not found.</p>
                    <Link to='/campgrounds' replace={true}>
                      Go back to campgrounds
                    </Link>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </AlertApi>
      </BrowserRouter>
    </AuthApi>
  </QueryClientProvider>
);
