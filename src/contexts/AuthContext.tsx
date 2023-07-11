import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { fetchUser } from "api/users"

type AuthContext = {
  user: AppUser | null
  setUser: (user: AppUser | null) => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export default function AuthApi({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loadingInitial, setLoadingInitial] = useState(true)

  useEffect(() => {
    const fetchUserFromServer = async () => {
      try {
        setUser(await fetchUser())
        setLoadingInitial(false)
      } catch {
        setLoadingInitial(false)
      }
    }
    fetchUserFromServer()
  }, [])

  const memoizedValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial ? (
        children
      ) : (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
