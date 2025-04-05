import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'UNKNOWN_ERROR';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse as { message: string }).message;
      errorType = 'HTTP_EXCEPTION';
    } else if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.name;
    }

    // Log the error with Pino
    this.logger.error({
      type: errorType,
      statusCode,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      requestId: request.id,
      body: request.body,
      query: request.query,
      params: request.params,
      userAgent: request.headers['user-agent'],
    }, `Error occurred: ${message}`);

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      requestId: request.id,
    });
  }
}