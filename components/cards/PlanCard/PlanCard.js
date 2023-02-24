import Styles from './PlanCard.module.scss';

export function PlanCard({ plan, selectedPlan, setSelectedPlan }) {
  return (
    <div
      className={`${Styles.card} ${
        selectedPlan?.id === plan.id ? 'selected' : ''
      }`}
      onClick={() => {
        setSelectedPlan(plan);
      }}
    >
      <div className={Styles.planType}>{plan?.recurring}</div>
      <div className={Styles.monthlyPrice}>
        ${plan.price}
        {plan?.recurring?.toLowerCase() === 'yearly' ? '/ yr' : '/ mo'}
      </div>
      {plan?.recurring?.toLowerCase() === 'yearly' && (
        <div className={Styles.monthlyPrice}>
          {' '}
          &#40;${(plan?.price / 12)?.toFixed(2)}/mo&#41;
        </div>
      )}
    </div>
  );
}
