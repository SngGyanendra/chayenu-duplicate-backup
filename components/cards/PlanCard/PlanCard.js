import Styles from './PlanCard.module.scss';

export function PlanCard({ plan, selectedPlan, setSelectedPlan }) {
  return (
    <div
      className={`${Styles.card} ${
        selectedPlan?.id === plan.id ? Styles.selectedPlan : ''
      }`}
      onClick={() => {
        setSelectedPlan(plan);
      }}
    >
      <div className={Styles.planType}>{plan?.recurring}</div>
      <div className={Styles.monthlyPrice}>
        ${plan.price}
        {plan?.recurring?.toLowerCase() === 'yearly' ? ' / yr' : ' / mo'}
        
      </div>
      <div className={Styles.monthlyPrice}>
        (${(plan?.recurring?.toLowerCase() !== 'yearly' ?plan.price*12:plan.price/12).toFixed(2)}
        {plan?.recurring?.toLowerCase() !== 'yearly' ? ' / yr' : ' / mo'})
        
      </div>

    </div>
  );
}
