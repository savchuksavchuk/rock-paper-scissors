import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Input } from '../Input'

type ManageGameProps = {
  onCreateGame: () => void
  onJoinGame: (gameId: string) => void
}

export const ManageGame = ({ onCreateGame, onJoinGame }: ManageGameProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ gameId: string }>()

  const submitJoinGame: SubmitHandler<{ gameId: string }> = (data) => {
    onJoinGame(data.gameId)
  }

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-3">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitJoinGame)}
      >
        <Controller
          name="gameId"
          control={control}
          rules={{
            required: 'Game id is required!',
          }}
          render={({ field }) => (
            <Input
              value={field.value}
              label="Game id"
              onChange={field.onChange}
              type="text"
              error={errors.gameId !== undefined}
              errorMessage={errors.gameId?.message}
            />
          )}
        />
        <Button
          type="submit"
          text="Join game"
          className="bg-blue-500 border-blue-600 w-full"
        />
      </form>

      <Button
        type="button"
        text="Create game"
        className="bg-green-500 border-green-600 w-full"
        onClick={onCreateGame}
      />
    </div>
  )
}
