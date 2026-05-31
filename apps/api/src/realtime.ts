import type { Server } from "socket.io";

let ioRef: Server | null = null;

export function setRealtimeServer(io: Server) {
  ioRef = io;
}

export function emitRealtime(event: string, payload: unknown) {
  ioRef?.emit(event, payload);
}

