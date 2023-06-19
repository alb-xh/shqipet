export enum ChatEvent {
  UpdateGeoMap = 'update_geo_map',
  CreateMessage = 'create_message',
  BroadcastMessage = 'broadcast_message',
  CreateRoom = 'create_room',
  CreatedRoom = 'created_room',
  JoinRoom = 'join_room',
  UpdateRoom = 'update_room',
};

export interface GeoInfo {
  name?: string,
  code?: string,
  city?: string,
  lat?: number,
  lng?: number,
};

export type GeoMap = Record<string, GeoInfo>;

export interface UserInfo {
  avatar?: string,
  name: string,
}

export interface RoomInfo {
  id: string,
  size: number,
  members: UserInfo[],
  meta?: Record<string, any>,
}

export interface Message {
  user: UserInfo,
  text: string,
};

export interface CreateRoomMessage {
  id: string,
  size: number,
  meta?: Record<string, any>,
}

export interface JoinRoomMessage {
  id: string,
  user: UserInfo,
}
