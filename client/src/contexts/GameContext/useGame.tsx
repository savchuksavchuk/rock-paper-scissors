import { useContext } from 'react'
import { GameContext } from './GameContext'

export const useGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('GameContext should be used within the GameProvider')
  }

  return context
}
