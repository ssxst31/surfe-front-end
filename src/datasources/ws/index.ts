import io from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_APP_HOST_NAME ?? "";

const isServer = typeof window === "undefined";

class WebSocket {
  io: any;
  constructor() {
    if (isServer) return;

    this.io = io(ENDPOINT, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 500,
    });
  }

  emit(event: any, data: any) {
    this.io.emit(event, data);
  }

  on(event: any, data: any) {
    this.io.on(event, data);
  }
}

export default new WebSocket();
