import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app";
import { setRealtimeServer } from "./realtime";

const port = Number(process.env.PORT ?? 4000);
const app = createApp();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true
  }
});

setRealtimeServer(io);

io.on("connection", (socket) => {
  socket.emit("connected", { message: "An Nhiên staff realtime ready" });
});

httpServer.listen(port, () => {
  console.log(`An Nhien API listening on http://localhost:${port}`);
});

