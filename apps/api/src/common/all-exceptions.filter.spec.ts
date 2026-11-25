import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockResponse: {
    status: jest.Mock;
    json: jest.Mock;
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
    };
    mockRequest = {
      headers: {
        'x-request-id': 'test-req-123',
      },
    };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
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
        meta: expect.objectContaining({
          requestId: 'test-req-123',
        }),
      }),
    );
  });

  it('should format 401 UnauthorizedException with safe message', () => {
    const exception = new UnauthorizedException('Authentication token expired');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 401,
        message: 'Authentication token expired',
      }),
    );
  });

  it('should format 404 NotFoundException with safe message', () => {
    const exception = new NotFoundException('Table not found');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 404,
        message: 'Table not found',
      }),
    );
  });

  it('should format validation errors with detailed fields', () => {
    const exception = new BadRequestException({
      statusCode: 400,
      message: ['email must be an email', 'password must be at least 8 characters'],
      error: 'Bad Request',
    });
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 400,
        message: 'Validation failed',
        details: [
          { message: 'email must be an email' },
          { message: 'password must be at least 8 characters' },
        ],
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
    // Explicitly verify secret internals are never present in the payload
    expect(JSON.stringify(responsePayload)).not.toContain('secretInternalSql');
    expect(JSON.stringify(responsePayload)).not.toContain('password_hash');
    expect(responsePayload.stack).toBeUndefined();
  });
});
