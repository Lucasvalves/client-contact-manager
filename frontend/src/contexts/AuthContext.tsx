import { createContext, useState, useContext, type ReactNode } from 'react'
import { IUser } from '@/interfaces'
import { AuthService } from '@/AuthService'

interface AuthContextData {
  user: IUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const authService = new AuthService()

  async function login(email: string, password: string) {
    const data = await authService.login({ email, password })
    setUser(data.user)
  }

  async function register(email: string, password: string) {
    const data = await authService.register({ email, password })
    setUser(data)
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}