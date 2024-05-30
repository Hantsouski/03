import styles from "./Positions.module.css"

import { PositionCard } from "./Position"
import { Position } from "../../game.interfaces"
import { POSITION_COLORS } from "../../utils"

const POSITIONS = [Position.Rock, Position.Paper, Position.Scissors]

export const PositionCards = () => {
  return (
    <div className={styles.positions}>
      {POSITIONS.map((position, i) => (
        <PositionCard
          key={i}
          position={position}
          color={POSITION_COLORS[position]}
        />
      ))}
    </div>
  )
}
