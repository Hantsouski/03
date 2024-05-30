export enum Position {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

interface WinResult {
  win: Position
}

interface TieResult {
  tie: Position
}

export enum MatchResult {
  Win = "Win",
  Loss = "Loss",
  Tie = "Tie",
}

export type GameResult = WinResult | TieResult

export type Nullable<T> = T | null

export type MatchStatus = "betting" | "playing" | "match ended" | "finished"

export type Bets = Partial<Record<Position, number>>

export interface GameState {
  status: MatchStatus
  balance: number
  bets: Bets
  computerPosition: Nullable<Position>
  playerPosition: Nullable<Position>
  matchResult: Nullable<MatchResult>
  win: number
}
