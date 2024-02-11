import express from "express"
import { createServer } from "node:http"
import dotenv from "dotenv"
import { Server } from "socket.io"
import { router } from "./routers/router"
import cors from "cors"
import mongoose from "mongoose"
import { errorMiddleware } from "./middlewares/error.middleware"
import { onConnection } from "./socket/handlers/connection.handler"

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", router)
app.use(errorMiddleware)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://127.0.0.1:5173"],
  },
})

const start = async () => {
  try {
    if (!process.env.DB_URL) throw new Error("No DB url available!")
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected to DB!"))

    io.on("connection", (socket) => {
      onConnection(io, socket)
    })

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
