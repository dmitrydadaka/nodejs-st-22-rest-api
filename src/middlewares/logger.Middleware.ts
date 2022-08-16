import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {

    console.log(req, res, `\nMethod: ${req.method}\nPath: ${req.url}`);

    process
      .on('uncaughtException', (err, origin) => {
        this.logger.error(`Caught exception: ${err}\nException origin: ${origin}`);
      })
      .on('unhandledRejection', (reason, promise) => {
        this.logger.error(`Unhandled Rejection at: ${promise}, 'reason: ${reason}`);
      });
    next();
  }
}
 