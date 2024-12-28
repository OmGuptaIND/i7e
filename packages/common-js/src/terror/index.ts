import { type ERROR_CODE_KEY, isObject } from './utils.js';

export function getTErrorFromUnknown(
  cause: unknown,
  metadata?: Record<string, unknown>,
): TError {
  if (cause instanceof TError) {
    return cause;
  }

  const terror = new TError({
    code: 'UNKNOWN_ERROR',
    cause,
    metadata,
  });

  // Inherit stack from error
  if (cause instanceof Error && cause.stack) {
    terror.stack = cause.stack;
  }

  return terror;
}

class UnknownCauseError extends Error {
  [key: string]: unknown;
}

function getCauseFromUnknown(cause: unknown): Error | undefined {
  if (cause instanceof Error) {
    return cause;
  }

  const type = typeof cause;
  if (type === 'undefined' || type === 'function' || cause === null) {
    return undefined;
  }

  // Primitive types just get wrapped in an error
  if (type !== 'object') {
    return new Error(String(cause));
  }

  // If it's an object, we'll create a synthetic error
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }

  return undefined;
}

export class TError extends Error {
  public readonly cause?: Error;
  public readonly code;
  public readonly metadata?: Record<string, unknown>;

  constructor(opts: {
    message?: string;
    code: ERROR_CODE_KEY;
    cause?: unknown;
    metadata?: Record<string, unknown>;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? opts.code;

    super(message, { cause });

    this.code = opts.code;
    this.name = this.constructor.name;
    this.metadata = opts.metadata;
  }
}
