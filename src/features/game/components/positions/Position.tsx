import styles from "./Position.module.css"

import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  bet,
  selectBetForPosition,
  selectCanIncreaseBet,
} from "../../gameSlice"
import type { Position } from "../../game.interfaces"
import { MovingNumbers, MovingNumber } from "../moving-numbers"
import { usePrevious } from "../../hooks"

interface PositionProps {
  position: Position
}
export const PositionCard = ({ position }: PositionProps) => {
  const canIncreaseBet = useAppSelector(selectCanIncreaseBet(position))
  const amount = useAppSelector(selectBetForPosition(position))
  const dispatch = useAppDispatch()

  const prevAmount = usePrevious(amount)

  return (
    <button
      onClick={() =>
        canIncreaseBet && dispatch(bet({ position, type: "increase" }))
      }
      className={`${styles.position} ${styles[position.toLowerCase()]}`}
    >
      <div className={styles.label}>{position}</div>
      <MovingNumbers key={`${prevAmount}+${amount}`}>
        <MovingNumber type="previous">{prevAmount}</MovingNumber>
        <MovingNumber type="current">{amount}</MovingNumber>
      </MovingNumbers>
    </button>
  )
}
