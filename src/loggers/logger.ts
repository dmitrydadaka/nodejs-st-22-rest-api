import * as winston from 'winston';

export const Logger = () => {
    return winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'request.log', level: 'info' }),
      ],
    });
  };
