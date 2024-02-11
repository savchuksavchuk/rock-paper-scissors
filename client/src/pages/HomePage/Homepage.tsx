import { Game } from '../../components/Game'
import { ManageGame } from '../../components/ManageGame'
import { useAuth } from '../../contexts/AuthContext/useAuth'
import { useGame } from '../../contexts/GameContext/useGame'
import { PlayerChoice } from '../../types/player'

export const HomePage = () => {
  const { gameId, createGame, joinGame, makeChoice, leaveGame } = useGame()
  const { user } = useAuth()

  const handleCreateGame = () => {
    if (!user?._id) {
      return
    }

    createGame(user._id)
  }

  const handleJoinGame = (gameId: string) => {
    if (!user?._id) {
      return
    }

    joinGame(user._id, gameId)
  }

  const handleMakeChoice = (choice: PlayerChoice) => {
    if (!user?._id) {
      return
    }

    makeChoice(user._id, choice)
  }

  const handleLeaveGame = () => {
    leaveGame()
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {!gameId && (
        <ManageGame
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
        />
      )}
      {gameId && (
        <Game
          onMakeChoice={handleMakeChoice}
          onLeaveGame={handleLeaveGame}
        />
      )}
    </div>
  )
}
