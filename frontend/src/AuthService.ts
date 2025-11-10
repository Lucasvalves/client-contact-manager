import { api } from './api/api'
import { IUser } from './interfaces'

export type LoginBody = {
  email: string
  password: string
}

export type AuthResponse = {
  user: IUser
  token: string
}

export class AuthService {
  async register(data: IUser): Promise<IUser> {
    const response = await api.post('/auth/register', data)

    const { token } = response.data
    localStorage.setItem('token', token)

    return response.data
  }

  async login(data: LoginBody): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)

    const { token } = response.data
    localStorage.setItem('token', token)

    return response.data
  }

  logout() {
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
