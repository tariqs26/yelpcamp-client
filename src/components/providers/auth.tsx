import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getUser } from "~/api/auth"
import type { User } from "~/types"
import { Fallback } from "../fallback"

type AuthUser = User | null | undefined

type AuthContextType = Readonly<{
  user: AuthUser
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>
}>

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
  children,
}: Readonly<React.PropsWithChildren>) => {
  const [user, setUser] = useState<AuthUser>(null)
  const [loadingInitial, setLoadingInitial] = useState(true)

  useEffect(() => {
    getUser()
      .then(setUser)
      .finally(() => setLoadingInitial(false))
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
    throw new Error("useAuth must be used within an AuthProvider")

  return context
}
