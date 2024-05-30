import { useAppSelector } from "../../../../app/hooks"
import { selectBalance, selectBetAmount, selectWin } from "../../gameSlice"
import styles from "./Header.module.css"

export const Header = () => {
  const balance = useAppSelector(selectBalance)
  const bet = useAppSelector(selectBetAmount)
  const win = useAppSelector(selectWin)

  return (
    <div className={styles.container}>
      <div className={styles.score}>
        Balance: <span>{balance}</span>
      </div>
      <div className={styles.score}>
        Bet: <span>{bet}</span>
      </div>
      <div className={styles.score}>
        Win: <span>{win}</span>
      </div>
    </div>
  )
}
