import styles from "./Position.module.css"

import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  bet,
  selectBetForPosition,
  selectCanDescreaseBet,
  selectCanIncreaseBet,
  selectIsBetting,
} from "../../gameSlice"
import type { Position } from "../../game.interfaces"

interface PositionProps {
  position: Position
}
export const PositionCard = ({ position }: PositionProps) => {
  const canIncreaseBet = useAppSelector(selectCanIncreaseBet(position))
  const canDescreaseBet = useAppSelector(selectCanDescreaseBet(position))
  const isBetting = useAppSelector(selectIsBetting)
  const amount = useAppSelector(selectBetForPosition(position))
  const dispatch = useAppDispatch()

  const betUnavailable = !canIncreaseBet && !canDescreaseBet

  return (
    <div className={`${styles.position} ${styles[position.toLowerCase()]}`}>
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
        className={`${styles.increaseButton} ${amount === 0 ? styles.increaseButtonCentered : ""}`}
        disabled={!canIncreaseBet}
        onClick={() => dispatch(bet({ position, type: "increase" }))}
      >
        <span>+</span>
      </button>

      <span
        className={`${styles.betAmount} ${(betUnavailable && isBetting) || amount === 0 ? styles.betAmountHidden : ""}`}
      >
        <span>{amount}</span>
      </span>
      <div className={styles.label}>{position}</div>
    </div>
  )
}
