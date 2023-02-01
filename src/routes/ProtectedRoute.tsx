import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Props = {
  element: JSX.Element;
  message?: string;
};

export default function ProtectedRoute({ element, message }: Props) {
  const { user } = useAuth();

  if (user) return element;
  return (
    <Navigate
      to='/login'
      replace
      state={{
        from: window.location.pathname,
        message,
      }}
    />
  );
}
