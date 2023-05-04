import { ForbiddenException, Injectable } from "@nestjs/common";
import { GeoInfo } from "@shqipet/geo";

export type UserData = { geo: GeoInfo };
export type IUsersMap = Record<string, UserData>;

Injectable()
export class UsersMap {
  private readonly usersMap: IUsersMap = {};

  exists (id: string): boolean {
    return !!this.usersMap[id];
  }

  get (id: string): UserData {
    if (!this.exists(id)) {
      throw new ForbiddenException();
    }

    return { ...this.usersMap[id] };
  }

  getAll (): IUsersMap {
    return { ...this.usersMap };
  }

  add (id: string, data: UserData): this {
    if (this.exists(id)) {
      throw new ForbiddenException();
    }

    this.usersMap[id] = data;

    return this;
  }

  remove (id: string): this {
    if (!this.exists(id)) {
      throw new ForbiddenException();
    }

    return this;
  }
}
