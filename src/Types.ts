import { KeyedObject } from "@greysole/spooder-component-library";

export interface ShareUserResponse {
  owner: KeyedObject;
  share: ShareObject;
  error: KeyedObject;
}

export interface ShareObject {
  shareId: string;
  share: ShareUser;
}

export interface ShareUser {
  name: string;
  joinMessage: string;
  leaveMessage: string;
  plugins: { [key: string]: boolean };
  commands: { [key: string]: boolean };
  streamPlatforms: KeyedObject;
  notificationPlatforms: KeyedObject;
  shareKey: string;
}
