import mongoose, { Schema } from "mongoose"
import { PlayerChoice } from "../types/player.types"

const GameSchema = new Schema(
  {
    player_one: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    player_two: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    player_one_choice: {
      type: String,
      enum: PlayerChoice,
      required: true,
      default: PlayerChoice.THINKING,
    },
    player_two_choice: {
      type: String,
      enum: PlayerChoice,
      required: true,
      default: PlayerChoice.THINKING,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
)

const getGameModel = () => mongoose.model("Game", GameSchema)

type GameModelType = ReturnType<typeof getGameModel>

export type IGameDocument = Awaited<ReturnType<GameModelType["create"]>>[number]

export default (mongoose.models.Rooms as GameModelType) || getGameModel()
