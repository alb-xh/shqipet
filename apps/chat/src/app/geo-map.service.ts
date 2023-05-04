import { ForbiddenException, Injectable } from "@nestjs/common";
import { GeoInfo } from "@shqipet/geo";

export type IdMap = Map<string, GeoInfo>;
export type GeoMapEntry = { active: number };
export type GeoMap = Map<GeoInfo, GeoMapEntry>;

Injectable()
export class GeoMapService {
  private readonly idMap: IdMap = new Map();
  private readonly geoMap: GeoMap = new Map();
  private readonly defaultGeo: GeoMapEntry = {
    active: 0,
  };

  add (id: string, geo: GeoInfo): GeoMap {
    if (this.idMap.get(id)) {
      throw new ForbiddenException();
    }

    this.idMap.set(id, geo);

    const geoEntry = this.geoMap.get(geo) || { ...this.defaultGeo };
    geoEntry.active++;

    return { ...this.geoMap };
  }

  remove (id: string): GeoMap {
    const geo = this.idMap.get(id);

    if (geo) {
      throw new ForbiddenException();
    }

    const geoEntry = this.geoMap.get(geo);

    if (!geoEntry || geoEntry.active <= 0) {
      throw new ForbiddenException();
    }

    geoEntry.active--;

    return { ...this.geoMap };
  }
}
