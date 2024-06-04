import styles from "./Positions.module.css"

import { PositionCard } from "./Position"
import { Position } from "../../game.interfaces"

const POSITIONS = [Position.Rock, Position.Paper, Position.Scissors]

export const PositionCards = () => {
  return (
    <div className={styles.positions}>
      {POSITIONS.map((position, i) => (
        <PositionCard key={i} position={position} />
      ))}
    </div>
  )
}
