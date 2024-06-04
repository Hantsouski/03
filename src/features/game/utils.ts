import type { Bets } from "./game.interfaces"
import { MatchResult, Position } from "./game.interfaces"

const MATCH_RESULT: Record<Position, Record<Position, MatchResult>> = {
  [Position.Rock]: {
    [Position.Rock]: MatchResult.Tie,
    [Position.Paper]: MatchResult.Win,
    [Position.Scissors]: MatchResult.Loss,
  },
  [Position.Paper]: {
    [Position.Paper]: MatchResult.Tie,
    [Position.Scissors]: MatchResult.Win,
    [Position.Rock]: MatchResult.Loss,
  },
  [Position.Scissors]: {
    [Position.Scissors]: MatchResult.Tie,
    [Position.Rock]: MatchResult.Win,
    [Position.Paper]: MatchResult.Loss,
  },
}

export const getMatchResult = (
  positionA: Position,
  positionB: Position,
): MatchResult => {
  return MATCH_RESULT[positionA][positionB]
}

const TOP_WIN_RATE = 14
const WIN_RATE = 3

export const calculateWinRate = (bets: Bets) => {
  const betsCount = Object.keys(bets).length

  if (!betsCount) {
    return 0
  }

  return betsCount > 1 ? WIN_RATE : TOP_WIN_RATE
}

export const calculateTotalBets = (bets: Bets) => {
  return Object.values(bets).reduce((total, amount) => total + amount, 0)
}

export const POSITION_COLORS = {
  [Position.Rock]: "#6881FD",
  [Position.Paper]: "#6CC417",
  [Position.Scissors]: "#FF3F00",
}

const positions = Object.values(Position)

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min

export const randomPosition = () => positions[randomInt(0, 3)]

export const playMatch = (
  computerPosition: Position,
  bets: Bets,
): [MatchResult, Position] => {
  const betPositions = Object.keys(bets) as Position[]

  if (betPositions.length === 1) {
    return [getMatchResult(computerPosition, betPositions[0]), betPositions[0]]
  }

  const winPosition = betPositions.find(
    pos => getMatchResult(computerPosition, pos) === MatchResult.Win,
  )

  if (winPosition) {
    return [MatchResult.Win, winPosition]
  }

  const lossPosition = betPositions.find(
    pos => getMatchResult(computerPosition, pos) === MatchResult.Loss,
  )!

  return [MatchResult.Loss, lossPosition]
}
