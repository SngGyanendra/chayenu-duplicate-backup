import Styles from "./index.module.scss";
import { PrintDigitalSubscriptionForm } from "../../../components/forms";

export default function Subscribe({ product }) {
  return (
    <div className={Styles.wrapper} id="payment-section">
      <div className={Styles.paymentCardsWrapper}>
        <h3 className={Styles.headline}>Subscribe - free 1 month trial</h3>
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
