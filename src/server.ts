import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function bootstrap() {
  try {
    app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })
    await mongoose.connect(config.DatabaseUrl as string)
    console.log('database connection successful')
  } catch (err) {
    console.log('failed to connect database', err)
  }
}

bootstrap()
