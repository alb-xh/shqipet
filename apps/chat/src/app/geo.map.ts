import { ForbiddenException, Injectable } from "@nestjs/common";
import { GeoInfo, GeoMap as IGeoMap } from "@shqipet/common";

Injectable()
export class GeoMap {
  private readonly geoMap: IGeoMap = {};

  exists (id: string): boolean {
    return !!this.geoMap[id];
  }

  get (id: string): GeoInfo {
    if (!this.exists(id)) {
      throw new ForbiddenException();
    }

    return { ...this.geoMap[id] };
  }

  getAll (): IGeoMap {
    return { ...this.geoMap };
  }

  add (id: string, data: GeoInfo): this {
    this.geoMap[id] = data;
    return this;
  }

  remove (id: string): this {
    if (!this.exists(id)) {
      throw new ForbiddenException();
    }

    delete this.geoMap[id];

    return this;
  }
}
