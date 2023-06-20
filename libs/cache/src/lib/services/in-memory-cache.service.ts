import { Injectable } from "@nestjs/common";

import { CacheOptions, CacheService, InMemoryCacheEntry } from "../types";
import { DEFAULT_TTL } from "../constants";

@Injectable()
export class InMemoryCacheService implements CacheService {
  private readonly map = new Map<string, InMemoryCacheEntry>();

  private readonly interval = setInterval(() => {
    for (const [key, value] of this.map.entries()) {
      if (this.isExpired(value)) {
        this.map.delete(key);
      }
    }
  }, 1000 * 60);

  private isExpired (entry: InMemoryCacheEntry): boolean {
    const { ttl ,createAt } = entry;

    return Date.now() > createAt + ttl;
  }

  async set<T>(key: string, value: T, options: CacheOptions): Promise<void> {
    const { ttl = DEFAULT_TTL } = options;

    this.map.set(key, {
      createAt: Date.now(),
      value,
      ttl,
    });
  }

  async has(key: string): Promise<boolean> {
    return this.map.has(key) && !this.isExpired(this.map.get(key) as any);
  }

  async get<T>(key: string): Promise<T | null> {
    if (!await this.has(key)) {
      return null;
    }

    const { value } = this.map.get(key) as any;

    return value;
  }


  async remove (key: string): Promise<void> {
    if (!await this.has(key)) {
      return;
    }

    this.map.delete(key);
  }
}