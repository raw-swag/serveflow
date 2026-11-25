import {
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { AllExceptionsFilter, sanitizeDiagnosticString } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockResponse: {
    status: jest.Mock;
    json: jest.Mock;
    setHeader: jest.Mock;
  };
  let mockRequest: {
    headers: Record<string, string>;
  };
  let mockHost: any;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      setHeader: jest.fn(),
    };
    mockRequest = {
      headers: {
        'x-request-id': 'valid-upstream-req-id-1234',
      },
    };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('should accept valid upstream request IDs and set response header', () => {
    filter.catch(new BadRequestException('Invalid'), mockHost);
    expect(mockResponse.setHeader).toHaveBeenCalledWith('X-Request-Id', 'valid-upstream-req-id-1234');
  });

  it('should reject invalid upstream request IDs (malicious characters or too short) and generate secure random UUID', () => {
    mockRequest.headers['x-request-id'] = 'bad<script>';
    filter.catch(new BadRequestException('Invalid'), mockHost);

    const generatedId = mockResponse.setHeader.mock.calls[0][1];
    expect(generatedId).toMatch(/^req_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('should format 400 BadRequestException with safe message', () => {
    const exception = new BadRequestException('Invalid table payload');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid table payload',
      }),
    );
  });

  it('CRITICAL: should NOT expose internal error messages, SQL queries, or stack traces on unexpected 500 error', () => {
    const secretInternalSql = 'SELECT * FROM users WHERE password_hash = "secret"';
    const rawError = new Error(`FATAL Database connection failed: ${secretInternalSql}`);

    filter.catch(rawError, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    const responsePayload = mockResponse.json.mock.calls[0][0];

    expect(responsePayload.success).toBe(false);
    expect(responsePayload.statusCode).toBe(500);
    expect(responsePayload.error).toBe('InternalServerError');
    expect(responsePayload.message).toBe(
      'An unexpected internal server error occurred. Please contact support.',
    );
    expect(JSON.stringify(responsePayload)).not.toContain('secretInternalSql');
    expect(JSON.stringify(responsePayload)).not.toContain('password_hash');
    expect(responsePayload.stack).toBeUndefined();
  });

  it('should sanitize sensitive passwords, tokens, and database credentials before logging', () => {
    const sensitive = 'Failed connecting to postgresql://postgres:SuperSecretPassword@localhost:5432 with bearer eyJhbGciOiJIUzI1NiJ9.test';
    const sanitized = sanitizeDiagnosticString(sensitive);

    expect(sanitized).not.toContain('SuperSecretPassword');
    expect(sanitized).not.toContain('eyJhbGciOiJIUzI1NiJ9');
    expect(sanitized).toContain('[REDACTED_PASSWORD]');
    expect(sanitized).toContain('[REDACTED_TOKEN]');
  });
});
