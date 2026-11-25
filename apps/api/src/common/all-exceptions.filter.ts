import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as crypto from 'crypto';

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string;
  details?: Array<{ field?: string; message: string }>;
  meta: {
    timestamp: string;
    requestId: string;
  };
}

const REQUEST_ID_REGEX = /^[a-zA-Z0-9_-]{8,64}$/;

export function sanitizeDiagnosticString(input: string): string {
  // Redact authorization tokens, bearer headers, passwords, secrets, connection strings
  return input
    .replace(/(bearer\s+)[a-zA-Z0-9_.-]+/gi, '$1[REDACTED_TOKEN]')
    .replace(/(password|secret|token|apikey|authorization)(["']?\s*[:=]\s*["']?)[^"',\s}]+/gi, '$1$2[REDACTED]')
    .replace(/(postgres(ql)?:\/\/[^:]+:)[^@]+(@)/gi, '$1[REDACTED_PASSWORD]$3');
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Safely generate or validate correlation Request ID
    const incomingHeader = request.headers['x-request-id'];
    let requestId: string;

    if (typeof incomingHeader === 'string' && REQUEST_ID_REGEX.test(incomingHeader)) {
      requestId = incomingHeader;
    } else {
      requestId = `req_${crypto.randomUUID()}`;
    }

    // Set request ID header on the outgoing response
    response.setHeader('X-Request-Id', requestId);

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
      // 500 Unexpected internal error: Log server-side diagnostics safely with credentials redacted
      const rawMessage = exception instanceof Error ? exception.message : String(exception);
      const sanitizedMessage = sanitizeDiagnosticString(rawMessage);
      const rawStack = exception instanceof Error ? exception.stack : undefined;
      const sanitizedStack = rawStack ? sanitizeDiagnosticString(rawStack) : undefined;

      this.logger.error(
        `[${requestId}] Internal Server Error: ${sanitizedMessage}`,
        sanitizedStack,
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
