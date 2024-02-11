import { Server, Socket } from "socket.io"
import { gameHandler } from "./game.handler"

export const onConnection = (io: Server, socket: Socket) => {
  console.log("New user connected")

  gameHandler(io, socket)
}
