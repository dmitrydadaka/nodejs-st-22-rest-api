import * as winston from 'winston';

export const ErrorLogger = () => {
  return winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });
};
