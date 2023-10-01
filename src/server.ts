import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.DatabaseUrl as string);
    logger.info('database connection successful');
    app.listen(config.port, () => {
      logger.info(`application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'unhandledRejection Rejection is detected, we are closing our server.....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
