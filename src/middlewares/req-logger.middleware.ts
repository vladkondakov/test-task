import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ReqLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('ReqLoggerMiddleware');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const ctx = {
      method,
      originalUrl,
      userAgent,
      ip,
      data: {
        query: request.query,
        body: request.body,
        params: request.params,
      },
    };

    this.logger.log({ ctx });
    next();
  }
}
