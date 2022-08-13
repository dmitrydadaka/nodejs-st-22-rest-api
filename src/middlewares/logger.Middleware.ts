import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../loggers/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.info({
      path: req.baseUrl,
      request: req,
      response: res,
      method: req.method,
    });
    next();
  }
}
 