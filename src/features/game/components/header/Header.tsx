import { useAppSelector } from "../../../../app/hooks"
import { selectBalance, selectBetAmount, selectWin } from "../../gameSlice"
import { usePrevious } from "../../hooks"
import { MovingNumbers, MovingNumber } from "../moving-numbers"
import styles from "./Header.module.css"

export const Header = () => {
  const balance = useAppSelector(selectBalance)
  const bet = useAppSelector(selectBetAmount)
  const win = useAppSelector(selectWin)
  const prevBet = usePrevious(bet)
  const prevBalance = usePrevious(balance)

  return (
    <div className={styles.container}>
      <div className={styles.score}>
        Balance:
        <div className={styles.scoreMov}>
          <MovingNumbers
            direction="down"
            key={`balance-${prevBalance}+${balance}`}
          >
            <MovingNumber type="previous">{prevBalance}</MovingNumber>
            <MovingNumber type="current">{balance}</MovingNumber>
          </MovingNumbers>
        </div>
      </div>
      <div className={styles.score}>
        Bet:
        <div className={styles.scoreMov}>
          <MovingNumbers key={`bet-${prevBet}+${bet}`}>
            <MovingNumber type="previous">{prevBet}</MovingNumber>
            <MovingNumber type="current">{bet}</MovingNumber>
          </MovingNumbers>
        </div>
      </div>
      <div className={styles.score}>
        Win: <span>{win}</span>
      </div>
    </div>
  )
}
