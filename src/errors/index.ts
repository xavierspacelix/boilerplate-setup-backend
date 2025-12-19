import { keys } from '@i18n/errorKeys';

import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(
    message: string = keys.BAD_REQUEST,
    detail?: Record<string, string>
  ) {
    super('BadRequestError', 'BadRequest', 400, message, detail);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(
    message: string = keys.UNAUTHORIZED,
    detail?: Record<string, string>
  ) {
    super('UnauthorizedError', 'UnauthorizedError', 401, message, detail);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor(
    message: string = keys.INVALID_CREDENTIALS,
    detail?: Record<string, string>
  ) {
    super('InvalidCredential', 'UnauthorizedError', 401, message, detail);
  }
}

export class ForbiddenError extends BaseError {
  constructor(
    message: string = keys.FORBIDDEN,
    detail?: Record<string, string>
  ) {
    super('ForbiddenError', 'Forbidden', 403, message, detail);
  }
}

export class NotFoundError extends BaseError {
  constructor(
    message: string = keys.NOT_FOUND,
    detail?: Record<string, string>
  ) {
    super('NotFoundError', 'NotFound', 404, message, detail);
  }
}

export class StorageError extends BaseError {
  constructor(
    message: string = keys.INTERNAL_SERVER,
    code = 'StorageError',
    statusCode = 500,
    detail?: Record<string, string>
  ) {
    super(code, 'StorageError', statusCode, message, detail);
  }
}

export class MediaError extends BaseError {
  constructor(
    message: string = keys.UNSUPPORTED_MEDIA,
    detail?: Record<string, string>
  ) {
    super('UnsupportedMediaType', 'UnsupportedMediaType', 415, message, detail);
  }
}

export class ValidationError extends BaseError {
  constructor(
    message: string = keys.VALIDATION_ERROR,
    detail?: Record<string, string>
  ) {
    super('ValidationError', 'ValidationError', 422, message, detail);
  }
}

export class RateLimitError extends BaseError {
  constructor(message = keys.RATE_LIMIT) {
    super('RateLimitError', 'TooManyRequests', 429, message);
  }
}

export class DatabaseError extends BaseError {
  constructor(message = keys.DB_ERROR) {
    super('DatabaseError', 'InternalServer', 500, message);
  }
}

export class CacheError extends BaseError {
  constructor(detail?: Record<string, string> | undefined) {
    super('CacheError', 'CacheError', 500, keys.CACHE_ERROR, detail);
  }
}

export class RedisConnectionError extends CacheError {
  constructor(detail?: Record<string, string> | undefined) {
    super({ message: keys.REDIS_CONNECTION });
    this.code = 'RedisConnectionError';
    this.detail = detail;
  }
}

export class UploadError extends BaseError {
  constructor(message = keys.UPLOAD) {
    super('UploadError', 'InternalServer', 500, message);
  }
}

export class InternalServerError extends BaseError {
  constructor(
    message = keys.INTERNAL_SERVER,
    detail?: Record<string, string> | undefined
  ) {
    super('InternalServerError', 'InternalServerError', 500, message, detail);
  }
}
