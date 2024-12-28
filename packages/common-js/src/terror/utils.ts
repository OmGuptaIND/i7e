export const ERROR_CODES_BY_KEY = {
  INTERNAL_SERVER_ERROR: 691,
  PARSE_ERROR: 692,
  INVALID_REQUEST: 693,
  NOT_FOUND: 694,
  OBJECT_UNDEFINED: 695,
  ALREADY_INITIALIZED: 696,
  UNKNOWN_ERROR: 697,
  INVALID_ARGUMENT: 698,
  INVALID_STATE: 699,
  INVALID_TYPE: 700,
  INVALID_OPERATION: 701,
  INVALID_FORMAT: 702,
  INVALID_LENGTH: 703,
  INVALID_VALUE: 704,
  INVALID_KEY: 705,
  INVALID_PATH: 706,
  INVALID_URL: 707,
} as const;

export type ERROR_CODE_KEY = keyof typeof ERROR_CODES_BY_KEY;

export function isObject(value: unknown): value is Record<string, unknown> {
  // check that value is object
  return !!value && !Array.isArray(value) && typeof value === 'object';
}
