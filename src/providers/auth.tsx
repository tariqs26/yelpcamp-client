import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { fetchUser } from "api/users"
import Fallback from "components/fallback"

type AuthContext = {
  user: AppUser | null
  setUser: (user: AppUser | null) => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
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
      {!loadingInitial ? children : <Fallback />}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
