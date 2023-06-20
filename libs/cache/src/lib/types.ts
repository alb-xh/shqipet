
export type CacheOptions = {
  ttl?: number;
};

export type InMemoryCacheEntry = {
  value: any;
  ttl: number;
  createAt: number;
};


export interface CacheService {
  get<T>(key: string): Promise<T | null>;

  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;

  has(key: string): Promise<boolean>;

  remove(key: string): Promise<void>;

  getAll<T>(prefix: string): Promise<T[]>;
};
