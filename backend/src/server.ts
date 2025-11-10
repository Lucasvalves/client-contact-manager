import express, { Application } from 'express'
import cors from 'cors'
import { AuthRoutes } from './routes/auth.routes'
import { CustomerRoutes } from './routes/customer.routes'
import { ContactRoutes } from './routes/contact.routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = new AuthRoutes().getRoutes()
const customerRoutes = new CustomerRoutes().getRoutes()
const contactRoutes = new ContactRoutes().getRoutes()

app.use('/auth', authRoutes)
app.use('/customers', customerRoutes)
app.use('/contacts', contactRoutes)

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err instanceof Error ? 400 : 500
  const message = err instanceof Error ? err.message : 'Internal Server Error'

  return res.status(statusCode).json({
    message
  })
}

app.use(errorHandler)

const port = process.env.PORT || 3333
app.listen(port, () => console.log('Server is running'))

export { app }
