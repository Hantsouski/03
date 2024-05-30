import styles from "./Position.module.css"

import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  bet,
  selectBetForPosition,
  selectCanDescreaseBet,
  selectCanIncreaseBet,
  selectIsBetting,
} from "../../gameSlice"
import type { CSSProperties } from "react"
import type { Position } from "../../game.interfaces"

interface PositionProps {
  position: Position
  color: string
}
export const PositionCard = ({ position, color }: PositionProps) => {
  const canIncreaseBet = useAppSelector(selectCanIncreaseBet(position))
  const canDescreaseBet = useAppSelector(selectCanDescreaseBet(position))
  const isBetting = useAppSelector(selectIsBetting)
  const amount = useAppSelector(selectBetForPosition(position))
  const dispatch = useAppDispatch()

  const betUnavailable = !canIncreaseBet && !canDescreaseBet

  return (
    <div
      className={styles.position}
      style={{ "--color": color } as CSSProperties}
    >
      <button
        hidden={betUnavailable || amount === 0}
        className={styles.descreaseButton}
        disabled={!canDescreaseBet}
        onClick={() => dispatch(bet({ position, type: "descrease" }))}
      >
        <span>-</span>
      </button>
      <button
        hidden={betUnavailable}
        className={styles.increaseButton}
        disabled={!canIncreaseBet}
        style={{
          right: amount === 0 ? "50%" : "12px",
          transform: amount === 0 ? "translateX(50%)" : "",
        }}
        onClick={() => dispatch(bet({ position, type: "increase" }))}
      >
        <span>+</span>
      </button>

      <span
        style={{
          visibility:
            (betUnavailable && isBetting) || amount === 0
              ? "hidden"
              : "visible",
        }}
        className={styles.betAmount}
      >
        <span>{amount}</span>
      </span>
      <div className={styles.label}>{position}</div>
    </div>
  )
}
