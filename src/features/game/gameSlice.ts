import { createSelector, type PayloadAction } from "@reduxjs/toolkit"

import { createAppSlice } from "../../app/createAppSlice"
import type { GameState, Position } from "./game.interfaces"
import { MatchResult } from "./game.interfaces"
import {
  calculateTotalBets,
  calculateWinRate,
  playMatch,
  randomPosition,
} from "./utils"

const BET_INCREMENT = 500

interface BetPayload {
  position: Position
  type: "increase" | "descrease"
}

const initialState: GameState = {
  status: "betting",
  balance: 5000,
  bets: {},
  computerPosition: null,
  playerPosition: null,
  matchResult: null,
  win: 0,
}

export const gameSlice = createAppSlice({
  name: "game",
  initialState,
  reducers: () => ({
    bet: (state, action: PayloadAction<BetPayload>) => {
      const { position, type } = action.payload
      const amount = type === "increase" ? BET_INCREMENT : -BET_INCREMENT

      if (!state.bets[position]) {
        state.bets[position] = 0
      }

      state.bets[position]! += amount

      if (state.bets[position] === 0) {
        delete state.bets[position]
      }

      state.balance -= amount
    },
    play: state => {
      state.status = "playing"

      state.computerPosition = randomPosition()
      const [matchResult, playerPosition] = playMatch(
        state.computerPosition,
        state.bets,
      )

      state.matchResult = matchResult
      state.playerPosition = playerPosition
    },
    nextMatch: state => {
      const balance = state.balance + state.win

      return {
        ...initialState,
        balance,
        ...(balance === 0 && { status: "finished" }),
      }
    },
    showMatchResult: state => {
      switch (state.matchResult) {
        case MatchResult.Win:
          state.win =
            state.bets[state.playerPosition!]! * calculateWinRate(state.bets)

          break

        case MatchResult.Tie:
          state.win = calculateTotalBets(state.bets)

          break

        case MatchResult.Loss:
          state.win = 0

          break

        default:
          break
      }

      state.status = "match ended"
    },
  }),
  selectors: {
    selectBalance: state => state.balance,
    selectBets: state => state.bets,
    selectBetAmount: state => calculateTotalBets(state.bets),
    selectComputerPosition: state => state.computerPosition,
    selectPlayerPosition: state => state.playerPosition,
    selectMatchResult: state => state.matchResult,
    selectCanPlay: state =>
      state.status === "betting" && Object.values(state.bets).length > 0,
    selectIsMatchEnded: state => state.status === "match ended",
    selectIsPlaying: state => state.status === "playing",
    selectIsBetting: state => state.status === "betting",
    selectIsFinished: state => state.status === "finished",
    selectWin: state => state.win,
  },
})

export const selectCanIncreaseBet = (position: Position) =>
  createSelector(
    [selectBets, selectBalance, selectIsBetting],
    (bets, balance, isBetting) =>
      (Object.values(bets).length < 2 || !!bets[position]) &&
      balance > 0 &&
      isBetting,
  )

export const selectCanDescreaseBet = (position: Position) => {
  return createSelector([selectBets, selectIsBetting], (bets, isBetting) => {
    return !!bets[position] && isBetting
  })
}

export const selectBetForPosition = (position: Position) =>
  createSelector([selectBets], bets => bets[position] || 0)

export const { bet, play, nextMatch, showMatchResult } = gameSlice.actions

export const {
  selectBalance,
  selectBets,
  selectComputerPosition,
  selectPlayerPosition,
  selectMatchResult,
  selectIsBetting,
  selectCanPlay,
  selectIsMatchEnded,
  selectIsPlaying,
  selectBetAmount,
  selectIsFinished,
  selectWin,
} = gameSlice.selectors
