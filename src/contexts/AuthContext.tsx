import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchUser } from 'api/usersAPI';

type AuthContextType = {
  user: AppUser | undefined;
  setUser: (user: AppUser | undefined) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthApi({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | undefined>();
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchUserFromServer = async () => {
      try {
        const user = await fetchUser();
        setUser(user);
        setLoadingInitial(false);
      } catch (error) {
        setLoadingInitial(false);
      }
    };
    fetchUserFromServer();
  }, []);

  const memoizedValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial ? (
        children
      ) : (
        <div className='d-flex justify-content-center mt-3'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
