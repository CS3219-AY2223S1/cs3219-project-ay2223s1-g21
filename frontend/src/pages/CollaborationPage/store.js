import { syncedStore } from "@syncedstore/core";

// Create your SyncedStore store
export const store = syncedStore({ collab: {}, fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC

// export const webrtcProvider = new WebrtcProvider("syncedstore-todos", doc);

// export const disconnect = () => webrtcProvider.disconnect();
// export const connect = () => webrtcProvider.connect();