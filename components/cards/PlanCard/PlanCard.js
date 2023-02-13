import Styles from './PlanCard.module.scss';

export function PlanCard({ plan }) {
  return (
    <div className={Styles.card}>
      <div className={Styles.planType}>{plan?.recurring}</div>
      <div className={Styles.monthlyPrice}>
        {plan.price}
        {plan?.recurring?.toLowerCase() === 'yearly' ? '/ yr' : '/ mo'}
      </div>
      {plan?.recurring?.toLowerCase() === 'yearly' && (
        <div className={Styles.monthlyPrice}>
          {' '}
          {(plan?.price / 12)?.toFixed(2)}/mo
        </div>
      )}
    </div>
  );
}
