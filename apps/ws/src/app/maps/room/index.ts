import { Injectable } from "@nestjs/common";
import { InMemoryCacheService } from "@shqipet/cache";

import { Room } from "./room";

Injectable()
export class RoomMap {
  private readonly prefix = 'room:';
  private readonly ttl = 1000 * 60 * 60;

  constructor (
    private readonly cache: InMemoryCacheService,
  ) {}

  private idToKey (id: string): string {
    return `${this.prefix}${id}`;
  }

  exists (id: string): Promise<boolean> {
    return this.cache.has(this.idToKey(id));
  }

  get (id: string): Promise<Room | null> {
    return this.cache.get(this.idToKey(id));
  }

  getAll (): Promise<Room[]> {
    return this.cache.getAll(this.prefix);
  }

  async set (room: Room): Promise<this> {
    await this.cache.set(this.idToKey(room.id), room, { ttl: this.ttl });

    return this;
  }

  async remove (id: string): Promise<this> {
    await this.cache.remove(this.idToKey(id));

    return this;
  }

}
