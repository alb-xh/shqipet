export declare enum ChatEvent {
    UpdateGeoMap = "update_geo_map",
    CreateMessage = "create_message",
    BroadcastMessage = "broadcast_message"
}
export interface GeoInfo {
    name?: string;
    code?: string;
    city?: string;
    lat?: number;
    lng?: number;
}
export type GeoMap = Record<string, GeoInfo>;
export interface UserInfo {
    avatar?: string;
    name: string;
}
export interface Message {
    user: UserInfo;
    text: string;
}
