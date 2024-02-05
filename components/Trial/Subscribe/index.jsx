import Styles from "./index.module.scss";
import { PrintDigitalSubscriptionForm } from "../../../components/forms";

export default function Subscribe({ product }) {
  return (
    <div className={Styles.wrapper} id="payment-section">
      <div className={Styles.paymentCardsWrapper}>
        <h3 className={Styles.headline}>Subscribe - free 1 month trial</h3>
        <p className={Styles.subtitle}>
          <span className={Styles.subtitleBlock}>
            Your billing of $180 (Annual Chayenu Subscription) will begin in 1 month.
          </span>
          <span className={Styles.subtitleBlock}>
            You may cancel anytime. Offer does not apply to Chayenu3 Edition
          </span>
        </p>
        <PrintDigitalSubscriptionForm
          selectedProduct={product}
          is_military_only={false}
          is_shluchim_only={false}
          student_only={false}
          is_trial
        />
      </div>
    </div>
  );
}
