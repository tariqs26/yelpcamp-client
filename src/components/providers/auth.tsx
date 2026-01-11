import { createContext, use, useEffect, useMemo, useState } from "react"
import { getUser } from "~/api/auth"
import type { User } from "~/types"

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

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  const memoizedValue = useMemo(() => ({ user, setUser }), [user])

  return <AuthContext value={memoizedValue}>{children}</AuthContext>
}

export const useAuth = () => {
  const context = use(AuthContext)

  if (context === null)
    throw new Error("useAuth must be used within an AuthProvider")

  return context
}
