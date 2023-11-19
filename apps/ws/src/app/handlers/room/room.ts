import { PublicUser, RoomInfo } from "@shqipet/common";

export class Room {
  readonly members = new Map<string, PublicUser>();

  constructor (
    readonly id: string,
    readonly title: string,
    readonly size?: number
  ) {}

  hasMember (id: string): boolean {
    return this.members.has(id);
  }

  getMember (id: string): PublicUser | null {
    return this.hasMember(id)
      ? this.members.get(id)
      : null;
  }

  setMember (id: string, user: PublicUser): this {
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