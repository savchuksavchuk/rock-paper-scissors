export enum PlayerGameStatus {
  IN_GAME = 'IN_GAME',
  MADE_A_CHOICE = 'MADE_CHOICE',
  LEAVED_GAME = 'LEAVED_GAME',
}

export type PlayerState = {
  username: string
  status: PlayerGameStatus
}

export enum PlayerChoice {
  PAPER = 'paper',
  ROCK = 'rock',
  SCISSORS = 'scissors',
}
