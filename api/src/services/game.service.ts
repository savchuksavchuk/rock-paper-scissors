import mongoose from "mongoose"
import gameModel from "../models/game.model"
import { ObjectId } from "mongodb"
import { ApiError } from "../exceptions/api.error"
import { GameResult } from "../types/game.types"
import { PlayerChoice } from "../types/player.types"

export class GameService {
  static createGame = async (playerId: string | mongoose.Types.ObjectId) => {
    const game = await gameModel.create({
      player_one: playerId,
    })

    return game._id
  }

  static joinGame = async (
    gameId: string | mongoose.Types.ObjectId,
    playerId: string | mongoose.Types.ObjectId,
  ) => {
    const game = await gameModel.findById(gameId)

    if (!game) {
      throw ApiError.BadRequest("No game with such id")
    }

    const playerExists =
      game.player_one?.toString() === playerId ||
      game.player_two?.toString() === playerId

    if (playerExists) {
      return game
    }

    if (!game.player_one) {
      game.player_one = new ObjectId(playerId)
    } else {
      game.player_two = new ObjectId(playerId)
    }

    await game.save()

    return game
  }

  static makeChoice = async (
    gameId: string | mongoose.Types.ObjectId,
    choice: PlayerChoice,
    playerId: string | mongoose.Types.ObjectId,
  ) => {
    const game = await gameModel.findById(gameId)

    if (!game) {
      throw ApiError.BadRequest("No game with such id")
    }
    const isFirstPlayer = game.player_one.toString() === playerId

    if (isFirstPlayer) {
      game.player_one_choice = choice
    } else {
      game.player_two_choice = choice
    }

    return await game.save()
  }

  static selectWinner = async (gameId: string | mongoose.Types.ObjectId) => {
    const game = await gameModel.findById(gameId)

    if (!game) {
      throw ApiError.BadRequest("No game with such id")
    }

    const firstPlayerChoice = game.player_one_choice
    const secondPlayerChoice = game.player_two_choice

    let result: GameResult | ObjectId

    switch (true) {
      case firstPlayerChoice === secondPlayerChoice:
        result = GameResult.DRAW
        game.player_one_choice = PlayerChoice.THINKING
        game.player_two_choice = PlayerChoice.THINKING
        break

      case firstPlayerChoice === PlayerChoice.PAPER &&
        secondPlayerChoice === PlayerChoice.ROCK:
        game.player_one_choice = PlayerChoice.THINKING
        game.player_two_choice = PlayerChoice.THINKING
        result = game.player_one
        break

      case firstPlayerChoice === PlayerChoice.SCISSORS &&
        secondPlayerChoice === PlayerChoice.PAPER:
        game.player_one_choice = PlayerChoice.THINKING
        game.player_two_choice = PlayerChoice.THINKING
        result = game.player_one
        break

      case firstPlayerChoice === PlayerChoice.ROCK &&
        secondPlayerChoice === PlayerChoice.SCISSORS:
        game.player_one_choice = PlayerChoice.THINKING
        game.player_two_choice = PlayerChoice.THINKING
        result = game.player_one
        break

      case firstPlayerChoice === PlayerChoice.THINKING ||
        secondPlayerChoice === PlayerChoice.THINKING:
        result = GameResult.NOTREADY
        break

      default:
        game.player_one_choice = PlayerChoice.THINKING
        game.player_two_choice = PlayerChoice.THINKING
        result = game.player_two
    }

    await game.save()

    return result
  }
}
