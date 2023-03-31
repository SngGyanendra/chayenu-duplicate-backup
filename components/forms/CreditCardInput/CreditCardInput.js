import { useEffect, useState } from 'react';
import { initializeCustomBraintree } from '/components/common';
import Styles from './creditcardinput.module.scss';

export function CreditCardInput({
  setCardNonce,
  creditCardForm,
  setCardErrors,
}) {
  const [hostedFields, setHostedFields] = useState();

  useEffect(() => {
    console.log(hostedFields);
  }, [hostedFields]);

  useEffect(() => {
    async function getData() {
      await initializeCustomBraintree(
        setCardNonce,
        setCardErrors,
        setHostedFields
      );
    }
    getData();

    function validateAndGetNonce() {
      console.log(hostedFields);
    }
    creditCardForm.current.addEventListener('submit', function(){
    validateAndGetNonce();

    });
    return () =>
      creditCardForm?.current?.removeEventListener('submit', function (e) {});
  }, []);
  // (e) => {
  //   e.preventDefault();
  //   test();
  //   hostedFields?.tokenize(function (err, payload) {
  //     console.log(payload);
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   });
  // };
  return (
    <div className={Styles.creditCard}>
      <form className={Styles.form} ref={creditCardForm}>
        <div className={Styles.ccnumber}>
          <label for="cc-number">Credit Number</label>
          <div id="cc-number" className={Styles.hostedFields}></div>
        </div>
        <div className={Styles.expirycvv}>
          <div>
            <label for="cc-expiry">Expiry</label>
            <div id="cc-expiry" className={Styles.hostedFields}></div>
          </div>
          <div>
            <label for="cc-cvv">CVV</label>
            <div id="cc-cvv" className={Styles.hostedFields}></div>
          </div>
        </div>
      </form>
    </div>
  );
}
