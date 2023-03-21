import { formatDateToNumberedDate } from '/util';
import Styles from './transactioncard.module.scss';
import { useWindowDimensions } from '/hooks';
export function TransactionCard({ transaction }) {
  const { width } = useWindowDimensions();

  return (
    <div className={Styles.card}>
      <div className={Styles.transactionDetail}>
        {width > 700 ? (
          transaction.plans.name
        ) : (
          <>
            <div
              className={`${Styles.paymentStatus} ${
                transaction.success ? Styles.successDot : Styles.failedDot
              }`}
            ></div>
            {transaction.plans.name}
          </>
        )}
      </div>
      <div className={Styles.transactionDetail}>${transaction.amount}</div>
      <div className={Styles.transactionDetail}>
        {formatDateToNumberedDate(transaction.created_on)}
      </div>
      <div className={Styles.transactionDetail}>Credit Card</div>
      <div className={Styles.transactionDetail}>
        {transaction.success ? (
          <span className={Styles.success}>Success</span>
        ) : (
          <span className={Styles.failed}>Failed</span>
        )}
      </div>
    </div>
  );
}
