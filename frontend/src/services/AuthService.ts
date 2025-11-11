import { IUser } from '@/interfaces'
import { api } from '../api/api'

export type LoginBody = {
  email: string
  password: string
}

export type AuthResponse = {
  user: IUser
  token: string
}

export class AuthService {
  async register(data: IUser): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data)
    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    return response.data
  }

  async login(data: LoginBody): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)
    const { token, user } = response.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    return response.data
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
