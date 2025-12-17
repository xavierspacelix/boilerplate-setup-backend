export class BaseError extends Error {
  code: string;
  statusCode: number = 500;
  detail?: Record<string, string>;

  constructor(
    name: string,
    code: string,
    statusCode: number,
    message: string,
    detail?: Record<string, string>
  ) {
    super(message);
    this.name = name;
    this.code = code;
    this.statusCode = statusCode;
    this.detail = detail;

    Error.captureStackTrace(this, this.constructor);
  }
}
