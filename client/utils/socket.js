import { io } from 'socket.io-client';
import Constants from 'expo-constants';
// get ip from expo
const expoServer = Constants.experienceUrl;
const ip = expoServer.substring(expoServer.lastIndexOf("//") + 2, expoServer.lastIndexOf(":"));

const socket = __DEV__ ? io(`http://${ip}:3000`, { autoConnect: false }) : null;
export default socket;