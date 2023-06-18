import Styles from './summary.module.scss';

export function Summary({
  selectedPlan,
  coupon,
  showTrialMessage
}) {

  const getPricingMessage = () => {
    const pricingMessage = !coupon
      ? selectedPlan.price
      : calculateDiscountedPrice(selectedPlan.price, coupon);    
  
    const tenure = selectedPlan.recurring.toLowerCase() === 'monthly' ? 'mo' : 'yr';
    const pricing = `$${pricingMessage}/${tenure}`
    return showTrialMessage ? `1st month FREE then ${pricing}`: pricing 
  }

  const calculateDiscountedPrice = (price, coupon) => {
    if (coupon?.amount_type?.toLowerCase() === 'percentage') {
      return price - (price * coupon.amount) / 100;
    } else {
      return price - coupon?.amount;
    }
  };
  return (
    <div className={Styles.summary}>
      <div className={Styles.planType}>
        <span>{selectedPlan?.name}</span>
        <span>{getPricingMessage()}</span>
      </div>
    </div>
  );
}
