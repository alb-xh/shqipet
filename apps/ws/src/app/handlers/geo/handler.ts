import { Injectable } from "@nestjs/common";
import { WsEvent } from "@shqipet/common";
import { Server, Socket } from "socket.io";
import { GeoService } from "@shqipet/geo";

import { IpExtractor } from "../../components";
import { GeoMap } from "./map";

@Injectable()
export class GeoHandler {
  constructor(
    private readonly IpExtractor: IpExtractor,
    private readonly geoService: GeoService,
    private readonly geoMap: GeoMap,
  ) {}

  private sendUpdatedMap (server: Server) {
    server.emit(
      WsEvent.UpdateGeoMap,
      Array.from(
        this.geoMap
          .getAll()
          .values()
      ),
    );
  }

  handleConnection (server: Server, client: Socket) {
    const ip = this.IpExtractor.extract(client);
    if (!ip) {
      return;
    }

    this.geoMap.set(client.id, this.geoService.getInfo(ip))

    this.sendUpdatedMap(server);
  }

  async handleDisconnect(server: Server, client: Socket) {
    if (!this.geoMap.exists(client.id)) {
      return;
    }

    this.geoMap.remove(client.id);

    this.sendUpdatedMap(server);
  }
}