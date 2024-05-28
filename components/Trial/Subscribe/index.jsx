import Styles from "./index.module.scss";
import { PrintDigitalSubscriptionForm } from "../../../components/forms";
import { getCountriesFromPlans } from "../../../util";

export default function Subscribe({ product }) {
  const countriesList = getCountriesFromPlans(product.plans);

  return (
    <div className={Styles.wrapper} id="payment-section">
      <div className={Styles.paymentCardsWrapper}>
        <h3 className={Styles.headline}>Subscribe - free 1 month trial</h3>
        <PrintDigitalSubscriptionForm
          selectedProduct={product}
          productPlans={product.plans}
          countriesList={countriesList}
          is_trial
        />
      </div>
    </div>
  );
}
