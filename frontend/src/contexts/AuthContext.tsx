import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode
} from 'react'
import { AuthService } from '../services/AuthService'
import { IUser } from '@/interfaces'

interface AuthContextData {
  user: IUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const authService = new AuthService()

  useEffect(() => {
    const token = authService.getToken()
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        authService.logout()
      }
    }
    setIsLoading(false)
  }, [])

  async function login(email: string, password: string) {
    setIsLoading(true)
    const data = await authService.login({ email, password })
    setUser(data.user)
    setIsLoading(false)
  }

  async function register(email: string, password: string) {
    setIsLoading(true)
    const data = await authService.register({ email, password })
    setUser(data.user)
    setIsLoading(false)
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
