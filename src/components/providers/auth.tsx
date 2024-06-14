import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { getUser } from "api/users"
import Fallback from "components/fallback"

type AuthUser = AppUser | null | undefined

interface AuthContextType {
  user: AuthUser
  setUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<AuthUser>(null)
  const [loadingInitial, setLoadingInitial] = useState(true)

  useEffect(() => {
    const fetchUserFromServer = async () => {
      try {
        setUser(await getUser())
      } catch {
      } finally {
        setLoadingInitial(false)
      }
    }
    void fetchUserFromServer()
  }, [])

  const memoizedValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <AuthContext.Provider value={memoizedValue}>
      {loadingInitial ? <Fallback /> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === null)
    throw new Error("useAuth must be used within AuthProvider")

  return context
}
