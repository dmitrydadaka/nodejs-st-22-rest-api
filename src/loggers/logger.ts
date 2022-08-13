import path from 'path';
import * as winston from 'winston';

export const LoggerDev = () => {
    return winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'request.log', level: 'info' }),
      ],
    });
  };

export const Logger = process.env.NODE_ENV === 'development' ? LoggerDev() : null;
