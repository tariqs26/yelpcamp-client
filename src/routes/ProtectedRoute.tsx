import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { user } = useAuth();

  if (user) {
    return element;
  } else {
    return (
      <Navigate
        to='/login'
        replace={true}
        state={{ from: window.location.pathname }}
      />
    );
  }
}
