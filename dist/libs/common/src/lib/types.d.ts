export declare enum WsEvent {
    UpdateGeoMap = "update_geo_map",
    CreateMessage = "create_message",
    BroadcastMessage = "broadcast_message",
    CreateRoom = "create_room",
    CreatedRoom = "created_room",
    JoinRoom = "join_room",
    UpdateRoom = "update_room",
    SendToRoom = "send_to_room",
    BroadcastToRoom = "broadcast_to_room"
}
export interface GeoInfo {
    name?: string;
    code?: string;
    city?: string;
    lat?: number;
    lng?: number;
}
export interface UserInfo {
    id: string;
    avatar?: string;
    name: string;
}
export interface RoomInfo {
    id: string;
    title: string;
    size?: number;
    members: UserInfo[];
}
export interface Message {
    user: UserInfo;
    text: string;
}
export interface CreateRoomMessage {
    id: string;
    title: string;
    size?: number;
}
export interface JoinRoomMessage {
    id: string;
    user: UserInfo;
}
export interface SendToRoomMessage {
    id: string;
    state: Record<string, any>;
}
