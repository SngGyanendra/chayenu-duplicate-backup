import Styles from './index.module.scss';
import { PrintDigitalSubscriptionForm } from '../../../components/forms';

export default function Subscribe({ product }) {
  return (
    <div className={Styles.paymentCardsWrapper}>
      <h3 className={Styles.headline}>Subscribe - free 1 month trial</h3>
      <p className={Styles.subtitle}>
        <span className={Styles.subtitleBlock}>Your billing will only start in 1 month. You may cancel at anytime.</span>
        <span className={Styles.subtitleBlock}>Offer does not apply to Chayenu3 Edition</span>
      </p>
      <PrintDigitalSubscriptionForm
        selectedProduct={product}
        is_military_only={false}
        student_only={false}
        is_trial
      />
    </div>
  );
}
