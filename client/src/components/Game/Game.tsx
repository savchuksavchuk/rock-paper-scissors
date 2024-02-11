import { useState } from 'react'
import { useGame } from '../../contexts/GameContext/useGame'
import { GameResult } from '../../types/game'
import { PlayerChoice, PlayerGameStatus } from '../../types/player'
import { Button } from '../Button'

const playerStatusMap = {
  [PlayerGameStatus.IN_GAME]: 'In game',
  [PlayerGameStatus.MADE_A_CHOICE]: 'Made a choice',
  [PlayerGameStatus.LEAVED_GAME]: 'Out of game',
}

const gameResultMap = {
  [GameResult.DRAW]: 'Draw',
  [GameResult.YOU_WON]: 'You won',
  [GameResult.YOU_LOST]: 'You lost',
}

type GameProps = {
  onMakeChoice: (choice: PlayerChoice) => void
  onLeaveGame: () => void
}

export const Game = ({ onMakeChoice, onLeaveGame }: GameProps) => {
  const { opponent, score, gameId, gameResult, continueGame } = useGame()
  const [choice, setChoice] = useState<PlayerChoice | null>(null)

  const onChoiceClick = (choice: PlayerChoice) => {
    setChoice(choice)
    onMakeChoice(choice)
  }

  const onContinueGameClick = () => {
    setChoice(null)
    continueGame()
  }

  const copyToClipboard = (gameId: string) => {
    navigator.clipboard.writeText(gameId)
  }

  if (gameResult) {
    return (
      <div className="flex flex-col w-full h-full max-h-[700px] max-w-[300px] items-center gap-[60px]">
        <p className="text-[24px] front-semibold">
          {gameResultMap[gameResult]}
        </p>
        <Button
          type="button"
          text="Continue"
          className="bg-blue-500 border-blue-600 w-full"
          onClick={() => onContinueGameClick()}
        />
        <Button
          type="button"
          text="Leave game"
          className="bg-red-500 border-red-600 w-full"
          onClick={() => onLeaveGame()}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full h-full max-h-[700px] max-w-[300px] items-center gap-[60px]">
      <div className="flex flex-col items-center">
        <p className="text-center">
          Send this game id to your friend <br /> (click to copy)
        </p>
        <Button
          type="button"
          text={gameId || ''}
          className={`w-full text-slate-700 ${choice === PlayerChoice.PAPER ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-300'}`}
          onClick={() => copyToClipboard(gameId || '')}
        />
      </div>
      <div className="flex gap-[30px] justify-center w-full">
        <div className="px-[10px] py-[10px] font-semibold text-slate-600 rounded-xl border-2 bg-green-500 border-green-600 w-full max-w-[100px] text-center">
          {score.you}
        </div>
        <div className="px-[10px] py-[10px] font-semibold text-slate-600 rounded-xl border-2 bg-red-500 border-red-600 w-full max-w-[100px] text-center">
          {score.opponent}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {opponent ? (
          <>
            <p className="text-[24px] front-semibold">{opponent?.username}</p>
            <p>{playerStatusMap[opponent?.status]}</p>
          </>
        ) : (
          <p className="text-[24px] front-semibold">
            Waiting for the opponent...
          </p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[24px] front-semibold">You</p>
        <div className="flex items-center justify-center gap-[10px] mt-[20px]">
          <Button
            type="button"
            text="Rock"
            className={`w-full text-slate-700 ${choice === PlayerChoice.ROCK ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-300'}`}
            onClick={() => onChoiceClick(PlayerChoice.ROCK)}
          />
          <Button
            type="button"
            text="Paper"
            className={`w-full text-slate-700 ${choice === PlayerChoice.PAPER ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-300'}`}
            onClick={() => onChoiceClick(PlayerChoice.PAPER)}
          />
          <Button
            type="button"
            text="Scissors"
            className={`w-full text-slate-700 ${choice === PlayerChoice.SCISSORS ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-300'}`}
            onClick={() => onChoiceClick(PlayerChoice.SCISSORS)}
          />
        </div>
      </div>
      <Button
        type="button"
        text="Leave game"
        className="bg-red-500 border-red-600 w-full"
        onClick={() => onLeaveGame()}
      />
    </div>
  )
}
