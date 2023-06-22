import { Injectable } from "@nestjs/common";
import { CreateRoomMessage, JoinRoomMessage, SendToRoomMessage, WsEvent } from "@shqipet/common";
import { Server, Socket } from "socket.io";

import { AuthManager } from "../../components";
import { RoomMap } from "./map";
import { Room } from "./room";

@Injectable()
export class RoomHandler {
  constructor(
    private readonly authManager: AuthManager,
    private readonly roomMap: RoomMap,
  ) {}

  async handleDisconnect (server: Server, client: Socket) {
    for (const room of await this.roomMap.getAll()) {
      for (const clientId of room.members.keys()) {

        if (clientId === client.id) {
          room.removeMember(clientId);

          server.to(room.id)
            .emit(WsEvent.UpdateRoom, room.getInfo());
        }
      }
    }
  }

  async handleCreateRoom(
    server: Server,
    client: Socket,
    { id, title, size }: CreateRoomMessage,
  ) {
    if (!(await this.authManager.isAuthenticated(client))) {
      return;
    }

    this.roomMap.set(new Room(id, title, size));
  }

  async handleJoinRoom(
    server: Server,
    client: Socket,
   { id, user }: JoinRoomMessage ,
  ) {
    if (!(await this.authManager.isAuthenticated(client))) {
      return;
    }

    const room = await this.roomMap.get(id);

    if (!room || room.hasMember(client.id)) {
      return;
    }

    room.setMember(client.id, user);

    for (const id of room.members.keys()) {
      server.to(id)
        .emit(WsEvent.UpdateRoom, room.getInfo());
    }
  }

  async handleSendToRoom(
    server: Server,
    client: Socket,
    { id, state }: SendToRoomMessage,
  ) {
    if (!(await this.authManager.isAuthenticated(client))) {
      return;
    }

    const room = await this.roomMap.get(id);

    if (!room || !room.hasMember(client.id)) {
      return;
    }

    for (const id of room.members.keys()) {
      server.to(id)
        .emit(WsEvent.BroadcastToRoom, state);
    }
  }
}