export type TEnhancedSetKeyOptions = string | number;

export const defaultCompareFn = (
  a: TEnhancedSetKeyOptions,
  b: TEnhancedSetKeyOptions,
): boolean => {
  if (a < b) {
    return false;
  }

  if (a > b) {
    return true;
  }

  return false;
};

export class EnhancedSet {
  private set: Set<string>;

  private compareFn: (
    a: TEnhancedSetKeyOptions,
    b: TEnhancedSetKeyOptions,
  ) => boolean;

  private getKey = (a: TEnhancedSetKeyOptions, b: TEnhancedSetKeyOptions) => {
    const key = this.compareFn(a, b) ? `${a}_${b}` : `${b}_${a}`;

    return key;
  };

  public get size() {
    return this.set.size;
  }

  public has = (a: TEnhancedSetKeyOptions, b: TEnhancedSetKeyOptions) => {
    const key = this.getKey(a, b);

    const value = this.set.has(key);

    return value;
  };

  public add = (a: TEnhancedSetKeyOptions, b: TEnhancedSetKeyOptions) => {
    const key = this.getKey(a, b);

    this.set.add(key);

    return key;
  };

  public delete = (a: TEnhancedSetKeyOptions, b: TEnhancedSetKeyOptions) => {
    const key = this.getKey(a, b);

    return this.set.delete(key);
  };

  public clear = () => {
    this.set.clear();
  };

  constructor(data: {
    compareFn?: typeof defaultCompareFn;
  }) {
    this.set = new Set<string>();

    if (data.compareFn) this.compareFn = data.compareFn;
    else this.compareFn = defaultCompareFn;
  }
}
