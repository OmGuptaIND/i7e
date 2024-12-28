/**
 * Retries an asynchronous function with exponential backoff.
 * @param {Function} func - The asynchronous function to retry.
 * @param {number} maxRetries - The maximum number of retries.
 * @param {number} initialDelay - The initial delay in milliseconds before retrying.
 * @param {number} maxDelay - The maximum delay in milliseconds between retries.
 * @returns {Promise<unknown>} - A Promise that resolves to the result of `func` or rejects after all retries fail.
 */
export const retryAsyncWithBackof = async <T = unknown>(
  func: () => Promise<T>,
  maxRetries = 5,
  initialDelay = 1000,
  maxDelay = 16000,
) => {
  let attempts = 0;
  let delay = initialDelay;

  const execute = async (): Promise<T> => {
    try {
      return await func();
    } catch (error) {
      if (++attempts > maxRetries) {
        throw new Error('All retries failed');
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, maxDelay);

      return execute();
    }
  };

  return execute();
};
