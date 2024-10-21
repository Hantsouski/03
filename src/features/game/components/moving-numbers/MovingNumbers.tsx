import type { PropsWithChildren, CSSProperties } from "react"
import styles from "./MovingNumbers.module.css"

interface MovingNumbersProps {
  direction?: "up" | "down"
}

export const MovingNumbers = ({
  children,
  direction = "up",
}: PropsWithChildren<MovingNumbersProps>) => {
  return (
    <div
      style={{ "--direction": direction === "up" ? 1 : -1 } as CSSProperties}
      className={styles.label}
    >
      {children}
    </div>
  )
}
