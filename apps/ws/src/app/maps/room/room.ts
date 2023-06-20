import { RoomInfo, UserInfo } from "@shqipet/common";

export class Room {
  readonly members = new Map<string, UserInfo>();

  constructor (
    readonly id: string,
    readonly title: string,
    readonly size?: number
  ) {}


  hasMember (id: string): boolean {
    return this.members.has(id);
  }

  getMember (id: string): UserInfo | null {
    return this.hasMember(id)
      ? this.members.get(id)
      : null;
  }

  setUser (id: string, user: UserInfo): this {
    this.members.set(id, user);
    return this;
  }

  removeMember (id: string): this {
    if (this.hasMember(id)) {
      this.members.delete(id);
    }

    return this;
  }

  getInfo (): RoomInfo {
    return {
      id: this.id,
      title: this.title,
      size: this.size,
      members: Array.from(this.members.values()),
    };
  }
}