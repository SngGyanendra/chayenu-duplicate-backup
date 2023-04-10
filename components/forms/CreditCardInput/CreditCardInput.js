import { useEffect } from 'react';
import { initializeCustomBraintree } from '/components/common';
import Styles from './creditcardinput.module.scss';

export function CreditCardInput({
  cardErrors,
  setHostedFields,
}) {
  useEffect(() => {
    async function getData() {
      await initializeCustomBraintree(setHostedFields);
    }
    getData();
  }, []);

  return (
    <div className={Styles.creditCard}>
      <div className={Styles.ccnumber}>
        <label for="cc-number">Credit Number</label>
        <div id="cc-number" className={Styles.hostedFields}></div>
        {cardErrors && (
          <span className={Styles.error}>{cardErrors.number}</span>
        )}
      </div>
      <div className={Styles.expirycvv}>
        <div>
          <label for="cc-expiry">Expiry</label>
          <div id="cc-expiry" className={Styles.hostedFields}></div>
          {cardErrors && (
            <span className={Styles.error}>{cardErrors.expiry}</span>
          )}
        </div>
        <div>
          <label for="cc-cvv">CVV</label>
          <div id="cc-cvv" className={Styles.hostedFields}></div>
          {cardErrors && <span className={Styles.error}>{cardErrors.cvv}</span>}
        </div>
      </div>
    </div>
  );
}
