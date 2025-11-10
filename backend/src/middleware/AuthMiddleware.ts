import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

class AuthMiddleware {
  handle(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      response.status(401).json({ message: 'Token is missing' })
      return
    }

    const [, token] = authHeader.split(' ')
    const secretKey = process.env.ACCESS_KEY_TOKEN

    if (!secretKey) {
      throw new Error('There is no token key')
    }

    try {
      const { sub } = verify(token, secretKey) as IPayload
      request.user_id = sub
      next()
    } catch {
      response.status(401).json({ message: 'Token expired or invalid' })
    }
  }
}

export { AuthMiddleware }
