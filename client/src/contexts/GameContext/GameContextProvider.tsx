import { ReactNode, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { PlayerChoice, PlayerGameStatus, PlayerState } from '../../types/player'
import { GameResult } from '../../types/game'
import { GameContext } from './GameContext'

export type AuthContextProviderType = {
  children: ReactNode
}

export const GameContextProvider = ({ children }: AuthContextProviderType) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameId, setGameId] = useState<string | null>(null)
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  const [opponent, setOpponent] = useState<PlayerState | null>(null)
  const [score, setScore] = useState<{ you: number; opponent: number }>({
    you: 0,
    opponent: 0,
  })

  useEffect(() => {
    const ws = io(import.meta.env.VITE_WS)
    setSocket(ws)

    ws.on('connect', () => console.log('Connected'))

    ws.on('newGame', (data) => {
      setGameId(data.gameId)
    })

    ws.on('joinedGame', (data) => {
      setGameId(data.gameId)
      setOpponent({
        username: data.opponent.username,
        status: data.opponent.status,
      })
    })

    ws.on('oponentConnected', (data) => {
      setOpponent({
        username: data.username,
        status: data.status,
      })
    })

    ws.on('opponentMadeChoice', () => {
      setOpponent((prev) => {
        if (!prev) return null

        return {
          ...prev,
          status: PlayerGameStatus.MADE_A_CHOICE,
        }
      })
    })

    ws.on('draw', () => {
      setGameResult(GameResult.DRAW)
    })

    ws.on('youWon', () => {
      setGameResult(GameResult.YOU_WON)

      setScore((prev) => ({
        ...prev,
        you: prev.you + 1,
      }))
    })

    ws.on('youLost', () => {
      setGameResult(GameResult.YOU_LOST)

      console.log(score)

      setScore((prev) => ({
        ...prev,
        opponent: prev.opponent + 1,
      }))
    })

    ws.on('opponentLeft', () => {
      setScore({ you: 0, opponent: 0 })
      setOpponent((prev) => {
        if (!prev) {
          return null
        }

        return {
          ...prev,
          status: PlayerGameStatus.LEAVED_GAME,
        }
      })
    })

    return () => {
      socket?.emit('leaveGame', { gameId })
      ws.disconnect()
    }
  }, [])

  const createGame = (playerId: string) => {
    socket?.emit('createGame', { playerId })
  }

  const joinGame = (playerId: string, gameId: string) => {
    socket?.emit('joinGame', { playerId, gameId })
  }

  const makeChoice = (playerId: string, choice: PlayerChoice) => {
    socket?.emit('makeChoice', { playerId, gameId, choice })
  }

  const continueGame = () => {
    setGameResult(null)

    setOpponent((prev) => {
      if (!prev) {
        return null
      }

      return {
        ...prev,
        status: PlayerGameStatus.IN_GAME,
      }
    })
  }

  const leaveGame = () => {
    setGameId(null)
    setOpponent(null)
    setScore({ you: 0, opponent: 0 })
    setGameResult(null)
    socket?.emit('leaveGame', { gameId })
  }

  const contextValue = {
    gameId,
    opponent,
    score,
    gameResult,
    createGame,
    joinGame,
    makeChoice,
    continueGame,
    leaveGame,
  }
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
