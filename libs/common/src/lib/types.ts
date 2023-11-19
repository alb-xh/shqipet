export enum WsEvent {
  UpdateGeoMap = 'update_geo_map',
  CreateMessage = 'create_message',
  BroadcastMessage = 'broadcast_message',
  CreateRoom = 'create_room',
  CreatedRoom = 'created_room',
  JoinRoom = 'join_room',
  UpdateRoom = 'update_room',
  SendToRoom = 'send_to_room',
  BroadcastToRoom = 'broadcast_to_room',
};

export interface GeoInfo {
  name?: string,
  code?: string,
  city?: string,
  lat?: number,
  lng?: number,
};

export interface RoomInfo {
  id: string,
  title: string,
  size?: number,
  members: PublicUser[],
}

export interface Message {
  user: PublicUser,
  text: string,
};

export interface CreateRoomMessage {
  id: string,
  title: string,
  size?: number,
}

export interface JoinRoomMessage {
  id: string,
  user: PublicUser,
}

export interface SendToRoomMessage {
  id: string,
  state: Record<string, any>,
};

export interface PublicUser {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  profilePictureUrl?: string,
  bio?: string,
}

export interface CreateUserResponse extends PublicUser {
  resetPasswordCode: string,
}

export interface CreateUser {
  username: string,
  firstName: string,
  lastName: string,
  password: string,
}

export interface UserSignIn {
  password: string,
}

export interface ChangePassword {
  oldPassword: string,
  newPassword: string,
}
