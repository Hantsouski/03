import { useAppDispatch, useAppSelector } from "../../app/hooks"

import styles from "./Game.module.css"
import {
  nextMatch,
  play,
  selectCanPlay,
  selectIsBetting,
  selectIsMatchEnded,
  selectIsPlaying,
  showMatchResult,
} from "./gameSlice"
import { PositionCards, Header, MatchTablo } from "./components"
import { useEffect } from "react"

export const Game = () => {
  const dispatch = useAppDispatch()
  const canPlay = useAppSelector(selectCanPlay)
  const isMatchEnded = useAppSelector(selectIsMatchEnded)
  const isBetting = useAppSelector(selectIsBetting)
  const isPlaying = useAppSelector(selectIsPlaying)

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        dispatch(showMatchResult())
      }, 1500)
    }
  }, [dispatch, isPlaying])

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.main}>
        <MatchTablo />

        <div className={styles.mainBottomPart}>
          <h2 hidden={!isBetting} className={styles.title}>
            Pick your positions
          </h2>
          <PositionCards />
          <div className={styles.buttonContainer}>
            {isMatchEnded ? (
              <button
                className={styles.button}
                onClick={() => dispatch(nextMatch())}
              >
                Clear
              </button>
            ) : (
              <button
                className={styles.button}
                disabled={!canPlay}
                onClick={() => dispatch(play())}
              >
                Play
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
