import { Injectable } from "@nestjs/common";
import { WsEvent, Message } from "@shqipet/common/backend";
import { Server, Socket } from "socket.io";

import { AuthManager, MessageFormatter } from "../components";

@Injectable()
export class MessagesHandler {
  constructor(
    private readonly authManager: AuthManager,
    private readonly messageFormatter: MessageFormatter,
  ) {}

  async handleCreateMessage (
    server: Server,
    client: Socket,
    { user, text }: Message,
  ) {
    if (!(await this.authManager.isAuthenticated(client))) {
      return;
    }

    const formattedText = this.messageFormatter.format(text);
    if (!formattedText) {
      return;
    }

    server.emit(WsEvent.BroadcastMessage, { user, text: formattedText });
  }
}
