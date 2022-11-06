import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// Create your SyncedStore store
export const store = syncedStore({ collab: {}, fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
// export const webrtcProvider = new WebrtcProvider("syncedstore-todos", doc, {
//     peerOpts: {
//         iceServers: [{
//             urls: [ "stun:ss-turn2.xirsys.com" ]
//         }, {
//             username: process.env.TURN_USERNAME,
//             credential: process.env.TURN_CREDENTIAL,
//             urls: [
//                 "turn:ss-turn2.xirsys.com:80?transport=udp",
//                 "turn:ss-turn2.xirsys.com:3478?transport=udp",
//                 "turn:ss-turn2.xirsys.com:80?transport=tcp",
//                 "turn:ss-turn2.xirsys.com:3478?transport=tcp",
//                 "turns:ss-turn2.xirsys.com:443?transport=tcp",
//                 "turns:ss-turn2.xirsys.com:5349?transport=tcp"
//             ]}]
//     }
// });

// export const disconnect = () => webrtcProvider.disconnect();
// export const connect = () => webrtcProvider.connect();
//