import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import UserRoutes from './app/modules/users/user.routes'
const app: Application = express()

// parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application route

app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running successfully')
})

export default app
