import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorData = {
      statusCode: status,
      path: request.url,
      method: request.method,
      message: exception.message,
      exceptionResponse,
      timestamp: new Date().toISOString(),
    };

    this.logger.error({ ...errorData, errorName: exception.name, filter: 'HttpExceptionFilter' });

    response.status(status).json(errorData);
  }
}
