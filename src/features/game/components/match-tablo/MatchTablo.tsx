import { useAppSelector } from "../../../../app/hooks"
import { MatchResult } from "../../game.interfaces"
import {
  selectComputerPosition,
  selectIsFinished,
  selectIsMatchEnded,
  selectIsPlaying,
  selectPlayerPosition,
  selectMatchResult,
  selectWin,
} from "../../gameSlice"
import { POSITION_COLORS } from "../../utils"
import styles from "./MatchTablo.module.css"

export const MatchTablo = () => {
  const isMatchEnded = useAppSelector(selectIsMatchEnded)
  const matchResult = useAppSelector(selectMatchResult)
  const win = useAppSelector(selectWin)
  const isPlaying = useAppSelector(selectIsPlaying)
  const isFinished = useAppSelector(selectIsFinished)

  const computerPosition = useAppSelector(selectComputerPosition)
  const playerPosition = useAppSelector(selectPlayerPosition)

  const color = matchResult === MatchResult.Win ? POSITION_COLORS[playerPosition!] : ""

  const matchResultTitle =
    matchResult === MatchResult.Win ? `${playerPosition} WON` : matchResult
  const playerWin =
    matchResult === MatchResult.Win || matchResult === MatchResult.Tie
      ? `You win`
      : ""

  return (
    <div className={styles.container}>
      {isPlaying && (
        <div className={styles.pvp}>
          <span>vs</span>
          <div>{computerPosition}</div>
          <div>{playerPosition}</div>
        </div>
      )}
      {isMatchEnded && (
        <div style={{ color }}>
          {matchResultTitle}{" "}
          {playerWin && (
            <div className={styles.playerWin}>
              You win <span>{win}</span>
            </div>
          )}
        </div>
      )}
      {isFinished && <div>Game over</div>}
    </div>
  )
}
