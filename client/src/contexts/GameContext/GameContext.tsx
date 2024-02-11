import { createContext } from 'react'
import { PlayerChoice, PlayerState } from '../../types/player'
import { GameResult } from '../../types/game'

export type GameContextType = {
  gameId: string | null
  opponent: PlayerState | null
  score: { you: number; opponent: number }
  gameResult: GameResult | null
  createGame: (playerId: string) => void
  joinGame: (playerId: string, gameId: string) => void
  makeChoice: (playerId: string, choice: PlayerChoice) => void
  continueGame: () => void
  leaveGame: () => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)
