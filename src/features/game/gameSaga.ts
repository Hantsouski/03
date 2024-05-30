import type { SagaIterator } from "redux-saga"
import { all, call, delay, put, select, take } from "redux-saga/effects"
import {
  play,
  selectBets,
  selectComputerPosition,
  setMatchResult,
  setComputerPosition,
  nextMatch,
  setWinAmount,
  endMatch,
  setPlayerPosition,
} from "./gameSlice"
import { getMatchResult } from "./utils"
import type { Bets } from "./game.interfaces"
import { MatchResult, Position } from "./game.interfaces"

const positions = Object.values(Position)

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min

const randomPosition = () => positions[randomInt(0, 3)]

function* computerMove(): SagaIterator {
  yield put(setComputerPosition({ position: randomPosition() }))
}

function* decideWinner(): SagaIterator {
  const computerPosition = yield select(selectComputerPosition)

  const bets: Bets = yield select(selectBets)

  const betPositions = Object.keys(bets) as Position[]

  if (betPositions.length === 1) {
    return yield all([
      put(
        setMatchResult({
          matchResult: getMatchResult(computerPosition, betPositions[0]),
        }),
      ),
      put(setPlayerPosition({ position: betPositions[0] })),
    ])
  }

  const tiePosition = betPositions.find(
    pos => getMatchResult(computerPosition, pos) === MatchResult.Tie,
  )

  if (tiePosition) {
    return yield all([
      put(setMatchResult({ matchResult: MatchResult.Loss })),
      put(
        setPlayerPosition({
          position:
            betPositions.find(
              pos => getMatchResult(computerPosition, pos) === MatchResult.Loss,
            ) ||
            betPositions.find(
              pos => getMatchResult(computerPosition, pos) === MatchResult.Tie,
            )!,
        }),
      ),
    ])
  }

  const winPosition = betPositions.find(
    pos => getMatchResult(computerPosition, pos) === MatchResult.Win,
  )

  if (winPosition) {
    return yield all([
      put(setMatchResult({ matchResult: MatchResult.Win })),
      put(setPlayerPosition({ position: winPosition })),
    ])
  }

  yield all([
    put(setMatchResult({ matchResult: MatchResult.Loss })),
    put(setPlayerPosition({ position: betPositions[0] })),
  ])
}

function* showResults(): SagaIterator {
  yield put(setWinAmount())
  yield put(endMatch())
}

export function* gameSaga(): SagaIterator {
  while (true) {
    yield take(play)

    yield call(computerMove)

    yield call(decideWinner)

    yield delay(1500)

    yield call(showResults)

    yield take(nextMatch)
  }
}
