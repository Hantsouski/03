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
import styles from "./MatchTablo.module.css"

export const MatchTablo = () => {
  const isMatchEnded = useAppSelector(selectIsMatchEnded)
  const matchResult = useAppSelector(selectMatchResult)
  const win = useAppSelector(selectWin)
  const isPlaying = useAppSelector(selectIsPlaying)
  const isFinished = useAppSelector(selectIsFinished)

  const computerPosition = useAppSelector(selectComputerPosition)
  const playerPosition = useAppSelector(selectPlayerPosition)

  const matchResultTitle =
    matchResult === MatchResult.Win ? `${playerPosition} WON` : matchResult
  const playerWin =
    matchResult === MatchResult.Win || matchResult === MatchResult.Tie
      ? `You win`
      : ""
  const winColor = matchResult === MatchResult.Win ? playerPosition!.toLowerCase() : '';

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
        <div className={styles[winColor]}>
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
