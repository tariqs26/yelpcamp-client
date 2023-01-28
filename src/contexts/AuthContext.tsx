import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchUser } from 'api/usersAPI';

type AuthContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthApi = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
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
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthApi;
