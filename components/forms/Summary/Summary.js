import Styles from './summary.module.scss';
import { useState } from 'react';
import Image from 'next/image';

export function Summary({ selectedPlan, coupon, showTrialMessage, values }) {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [quantity, setQuantity] = useState(values.quantity);

  const getPricingMessage = () => {
    const pricingMessage = !coupon
      ? selectedPlan.price
      : calculateDiscountedPrice(selectedPlan.price, coupon);

    const tenure =
      selectedPlan.recurring.toLowerCase() === 'monthly' ? 'mo' : 'yr';
    const pricing = `$${pricingMessage}/${tenure}`;
    return showTrialMessage ? `1st month FREE then ${pricing}` : pricing;
  };

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
      {selectedPlan?.product?.product_type.toLowerCase() !== 'digital' && (
        <div className={Styles.quantitySection}>
          <div className={Styles.quantity}>
            Quantity
            <Image
              src="/icons/question.svg"
              alt="question"
              height={20}
              width={20}
              className={Styles.tooltipSymbol}
              onMouseEnter={() => setIsToolTipVisible(true)}
              onMouseLeave={() => setIsToolTipVisible(false)}
            />
          </div>
          <div
            className={Styles.tooltip}
            style={{ display: isToolTipVisible ? 'block' : 'none' }}
          >
            The total number of subscription copies you want
          </div>
          <select
            name="quantity"
            onChange={(e) => {
              values.quantity = e.target.value;
              setQuantity(e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      )}
      {selectedPlan?.product?.product_type.toLowerCase() !== 'digital' && (
        <div className={Styles.total}>
          Total
          <span className={Styles.totalPrice}>
            {coupon
              ? `$${
                  calculateDiscountedPrice(selectedPlan.price, coupon) *
                  quantity
                }/${
                  selectedPlan.recurring.toLowerCase() === 'monthly'
                    ? 'mo'
                    : 'yr'
                }`
              : `$${selectedPlan.price * quantity}/${
                  selectedPlan.recurring.toLowerCase() === 'monthly'
                    ? 'mo'
                    : 'yr'
                }`}
          </span>
        </div>
      )}
    </div>
  );
}
