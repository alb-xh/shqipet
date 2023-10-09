import { Injectable } from "@nestjs/common";
import { GeoInfo } from "@shqipet/common";

Injectable()
export class GeoMap {
  private readonly geoMap = new Map<string, GeoInfo>();

  exists (id: string): boolean {
    return this.geoMap.has(id);
  }

  get (id: string): GeoInfo | null {
    if (!this.exists(id)) {
      return null;
    }

    return this.geoMap.get(id);
  }

  getAll (): Map<string, GeoInfo> {
    return this.geoMap;
  }

  set (id: string, data: GeoInfo): this {
    this.geoMap.set(id, data);

    return this;
  }

  remove (id: string): this {
    if (this.exists(id)) {
      this.geoMap.delete(id);
    }

    return this;
  }
}
