export type TEnhancedMapKeyOptions = string | number;

export const defaultCompareFn = (
  a: TEnhancedMapKeyOptions,
  b: TEnhancedMapKeyOptions,
): boolean => {
  if (a < b) {
    return false;
  }

  if (a > b) {
    return true;
  }

  return false;
};

export class EnhancedMap<T> {
  private map: Map<string, T>;

  private compareFn: (
    a: TEnhancedMapKeyOptions,
    b: TEnhancedMapKeyOptions,
  ) => boolean;

  private getKey = (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => {
    const key = this.compareFn(a, b) ? `${a}_${b}` : `${b}_${a}`;

    return key;
  };

  public get data() {
    return this.map;
  }

  public values = () => {
    return this.map.values();
  };

  public get keys() {
    return this.map.keys();
  }

  public get size() {
    return this.map.size;
  }

  public get = (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => {
    const key = this.getKey(a, b);

    const value = this.map.get(key);

    return value;
  };

  public set = (
    a: TEnhancedMapKeyOptions,
    b: TEnhancedMapKeyOptions,
    value: T,
  ) => {
    const key = this.getKey(a, b);

    this.map.set(key, value);

    return value;
  };

  public delete = (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => {
    const key = this.getKey(a, b);

    return this.map.delete(key);
  };

  public clear = () => {
    this.map.clear();
  };

  public has = (a: TEnhancedMapKeyOptions, b: TEnhancedMapKeyOptions) => {
    const key = this.getKey(a, b);

    return this.map.has(key);
  };

  constructor(data: {
    compareFn?: typeof defaultCompareFn;
  }) {
    this.map = new Map<string, T>();

    if (data.compareFn) this.compareFn = data.compareFn;
    else this.compareFn = defaultCompareFn;
  }
}
