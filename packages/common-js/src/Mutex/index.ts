export class Mutex {
  private _locking: Promise<void>;

  private _locks: number;

  constructor() {
    this._locking = Promise.resolve();
    this._locks = 0;
  }

  public isLocked = () => {
    return this._locks > 0;
  };

  public lock = async () => {
    this._locks += 1;

    let unlockNext: () => void;

    const willLock = new Promise<void>(
      (resolve) =>
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        (unlockNext = () => {
          this._locks -= 1;
          resolve();
        }),
    );

    const willUnlock = this._locking.then(() => unlockNext);

    this._locking = this._locking.then(() => willLock);

    return willUnlock;
  };
}
