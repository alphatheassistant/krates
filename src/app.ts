import dotenv from 'dotenv-safe'
import express, { Application } from 'express'
import cors from 'cors'
import { parentRouter } from '@src/routes'
import { CreateError, HandleError } from '@src/middleware/errorHandler'
import { morganMiddleware } from '@src/middleware/morgan'
import { connectDatabase } from '@src/helpers/connectDatabase'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      apiKey: string | null
    }
  }
}

dotenv.config({ allowEmptyValues: true })

export const createApp = async (): Promise<Application> => {
  const app: Application = express()

  connectDatabase()

  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(morganMiddleware)

  app.use(parentRouter)
  app.use((req, res, next) => {
    next(CreateError.NotFound('Not Found'))
  })
  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) =>
    HandleError(err, req, res, next)
  )
  return app
}
