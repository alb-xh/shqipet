import { ForbiddenException, Injectable } from "@nestjs/common";
import { RoomInfo, UserInfo } from "@shqipet/common";

type Member = {
  id: string,
  user: UserInfo,
};

type MemberMap = Record<string, Member>;

class Room {
  readonly createdAt = Date.now();

  constructor (
    readonly id: string,
    readonly size: number,
    readonly members: MemberMap,
    readonly meta: Record<string, any> = {},
  ) {}

  memberExists (id: string): boolean {
    return !!this.members[id];
  }

  getMember (id: string): Member {
    if (!this.memberExists(id)) {
      throw new ForbiddenException();
    }

    return this.members[id];
  }

  setMember (member: Member): this {
    if (this.memberExists(member.id)) {
      throw new ForbiddenException();
    }

    if (Object.keys(this.members).length >= this.size) {
      throw new ForbiddenException();
    }

    this.members[member.id] = member;

    return this;
  }

  removeMember (id: string): this {
    const member = this.getMember(id);
    delete this.members[member.id];

    return this;
  }
}

type IRoomMap = Record<string, Room>;

Injectable()
export class RoomMap {
  private readonly roomMap: IRoomMap  = {};
  private readonly ttl = 1000 * 60 * 10;
  private readonly interval = setInterval(() => this.clearStaleRooms(), this.ttl);

  private clearStaleRooms (): void {
    const now = Date.now();

    for (const id in this.roomMap) {
      const { createdAt } = this.roomMap[id];

      if (now > createdAt + this.ttl) {
        this.remove(id);
      }
    }
  }

  exists (id: string): boolean {
    return !!this.roomMap[id];
  }

  get (id: string): Room {
    if (!this.exists(id)) {
      throw new ForbiddenException();
    }

    return this.roomMap[id];
  }

  getAll (): IRoomMap {
    return this.roomMap;
  }

  set (room: Omit<RoomInfo, 'members' | 'createdAt'>): this {
    const { id, size, meta } = room;

    if (this.exists(id)) {
      throw new ForbiddenException();
    }

    this.roomMap[id] = new Room(id, size, {}, meta);

    return this;
  }

  remove (id: string): this {
    const room = this.get(id);

    delete this.roomMap[room.id];

    return this;
  }

  getInfo (room: Room): RoomInfo {
    const { id, size, members, meta } = room;

    return {
      id,
      size,
      members: Object.values(members).map(({ user }) => user),
      meta,
    };
  }
}
