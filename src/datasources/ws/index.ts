import io, { Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_APP_API_NAME ?? "";

const isServer = typeof window === "undefined";

class WebSocket {
  io: Socket | null = null;

  constructor() {
    if (isServer) return;

    this.io = io(ENDPOINT, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 500,
    });
  }

  emit(event: string, data: any) {
    this.io?.emit(event, data);
  }

  on(event: string, callback: any) {
    this.io?.on(event, callback);
  }
}

export default new WebSocket();
