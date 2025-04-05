import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const request = ctx.getRequest<Request>();
    let message = 'Internal server error';
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as { message: string }).message;
    } 

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}