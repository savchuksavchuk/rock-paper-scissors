import { Server, Socket } from "socket.io"
import { GameService } from "../../services/game.service"
import userModel from "../../models/user.model"
import { GameResult } from "../../types/game.types"
import { PlayerGameStatus } from "../../types/player.types"

export const gameHandler = (io: Server, socket: Socket) => {
  socket.on("createGame", async (data) => {
    const gameId = await GameService.createGame(data.playerId)

    socket.join(gameId.toString())
    socket.emit("newGame", { gameId: gameId })
  })

  socket.on("joinGame", async (data) => {
    const game = await GameService.joinGame(data.gameId, data.playerId)

    socket.join(game._id.toString())

    const [player_one, player_two] = await Promise.all([
      userModel.findById(game.player_one),
      userModel.findById(game.player_two),
    ])

    socket.emit("joinedGame", {
      gameId: game._id,
      opponent: {
        username: player_one?.username,
        status: PlayerGameStatus.IN_GAME,
      },
    })

    socket.to(game?._id.toString()).emit("oponentConnected", {
      username: player_two?.username,
      status: PlayerGameStatus.IN_GAME,
    })
  })

  socket.on("makeChoice", async (data) => {
    const game = await GameService.makeChoice(
      data.gameId,
      data.choice,
      data.playerId,
    )

    const gameResult = await GameService.selectWinner(data.gameId)

    if (gameResult === GameResult.NOTREADY) {
      socket.to(game?._id.toString()).emit("opponentMadeChoice", {
        opponentStatus: PlayerGameStatus.MADE_A_CHOICE,
      })
      return
    }

    if (gameResult === GameResult.DRAW) {
      io.to(data.gameId).emit("draw")
      return
    }

    const youWon = gameResult.toString() === data.playerId

    if (youWon) {
      socket.emit("youWon")
      socket.to(game?._id.toString()).emit("youLost")
    } else {
      socket.emit("youLost")
      socket.to(game?._id.toString()).emit("youWon")
    }
  })

  socket.on("leaveGame", (data) => {
    socket.to(data.gameId.toString()).emit("opponentLeft")
  })
}
