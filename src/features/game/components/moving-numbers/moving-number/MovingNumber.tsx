import type { PropsWithChildren } from "react"

import styles from "./MovingNumber.module.css"

type NumberType = "previous" | "current"

interface MovingNumberProps {
  type: NumberType
}

export const MovingNumber = ({
  children,
  type,
}: PropsWithChildren<MovingNumberProps>) => {
  return (
    <div
      className={`${styles.number} ${type === "current" ? styles.currentNumber : styles.previousNumber}`}
    >
      <div>{children}</div>
    </div>
  )
}
