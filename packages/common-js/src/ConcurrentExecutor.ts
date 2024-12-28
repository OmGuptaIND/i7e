export class ConcurrentExecutor {
  #semaphore: number;

  #tasks: (() => Promise<void>)[] = [];

  constructor(data?: { maxConcurrentSeq: number }) {
    this.#semaphore = data?.maxConcurrentSeq ?? 10;
  }

  add = async <T = unknown>(fn: () => Promise<T>) => {
    const promise = new Promise<T>((resolve, reject) => {
      this.#tasks.push(() => fn().then(resolve).catch(reject));
      this.#run();
    }).catch((error) => {
      console.error('Error Executing Function, ', error);

      throw new Error('Error Executing Function');
    });

    return promise;
  };

  #run = async () => {
    if (this.#tasks.length === 0) {
      return;
    }

    if (this.#semaphore === 0) {
      return;
    }

    --this.#semaphore;

    const lastFn = this.#tasks.pop();

    if (lastFn) {
      await lastFn().catch((error) => {
        console.error('Error Executing Function', error);
      });
    }

    ++this.#semaphore;

    this.#run();
  };
}
