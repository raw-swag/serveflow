import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  details?: Array<{ field?: string; message: string }>;
  meta: {
    timestamp: string;
    requestId?: string;
  };
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId =
      (request.headers['x-request-id'] as string) ||
      `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorName = 'InternalServerError';
    let safeMessage = 'An unexpected internal server error occurred. Please contact support.';
    let details: Array<{ field?: string; message: string }> | undefined = undefined;

    if (isHttpException) {
      errorName = exception.name;
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        safeMessage = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const resp = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(resp.message)) {
          safeMessage = 'Validation failed';
          details = resp.message.map((msg: unknown) => ({
            message: String(msg),
          }));
        } else if (typeof resp.message === 'string') {
          safeMessage = resp.message;
        }

        if (typeof resp.error === 'string') {
          errorName = resp.error;
        }
      }
    } else {
      // 500 Unexpected internal error: Log server-side diagnostics safely without exposing to client
      const rawMessage = exception instanceof Error ? exception.message : String(exception);
      const stack = exception instanceof Error ? exception.stack : undefined;
      this.logger.error(
        `[${requestId}] Internal Server Error: ${rawMessage}`,
        stack,
      );
    }

    const payload: ApiErrorResponse = {
      success: false,
      statusCode: status,
      error: errorName,
      message: safeMessage,
      ...(details ? { details } : {}),
      meta: {
        timestamp: new Date().toISOString(),
        requestId,
      },
    };

    response.status(status).json(payload);
  }
}
