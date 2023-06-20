import { Injectable } from "@nestjs/common";
import { GeoMap, WsEvent } from "@shqipet/common";
import { Server, Socket } from "socket.io";
import { IpExtractor } from "../components";
import { GeoService } from "@shqipet/geo";

@Injectable()
export class MapHandler {
  constructor(
    private readonly IpExtractor: IpExtractor,
    private readonly geoService: GeoService,
    private readonly geoMap: GeoMap,
  ) {}

  handleConnection (server: Server, client: Socket) {
    const ip = this.IpExtractor.extract(client);
    if (!ip) {
      return;
    }

    const geoInfo = this.geoService.getInfo(ip);

    server.emit(
      WsEvent.UpdateGeoMap,
      this.geoMap.add(client.id, geoInfo)
        .getAll()
    );
  }
}