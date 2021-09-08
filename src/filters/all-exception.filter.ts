import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorData = {
      exception,
      statusCode: status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    };

    this.logger.error({
      ...errorData,
      errorName: 'Internal Server Error',
      filter: 'AllExceptionsFilter',
    });

    response.status(status).json(errorData);
  }
}
