import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { updatePaymentMethods } from '/store/userSlice';
import { NextHead } from '/components/common';
import { PageLoadFailed } from '/components/common';
import { PaymentMethod } from '/components/cards';
import { AddPaymentMethod } from '/components/forms';
import { PaymentMethodSkeleton } from '/components/cards';
import { Toaster } from 'react-hot-toast';
import Styles from '/styles/payments.module.scss';

export default function Payments() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState('');
  const [addPaymentMethodForm, setAddPaymentMethodForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { payment_methods } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const APIs = new AuthencticatedUserAPI();

  useEffect(() => {
    async function getData() {
      const newPaymentMethods = await APIs.getAllPaymentMethods();
      if (!newPaymentMethods) {
        setError('Unable to fetch data currently!');
        return;
      }
      setPaymentMethods(newPaymentMethods);
      dispatch(updatePaymentMethods(newPaymentMethods));
      setLoading(false);
    }

    if (payment_methods?.length === 0) {
      getData();
    } else {
      setPaymentMethods(payment_methods);
      setLoading(false);
    }
  }, [payment_methods]);

  return (
    <>
      {error && <PageLoadFailed error={error} />}
      {!error && (
        <section className={Styles.page}>
          <NextHead title="Chayenu | Portal | Payments" />
          <div className={Styles.cardList}>
            {loading
              ? Array.apply(0, Array(3)).map(function (_, i) {
                  return (
                    <div key={i}>
                      <PaymentMethodSkeleton />
                    </div>
                  );
                })
              : paymentMethods?.map((paymentMethod, index) => (
                  <PaymentMethod key={index} paymentMethod={paymentMethod} />
                ))}
          </div>
          {!addPaymentMethodForm ? (
            <button onClick={() => setAddPaymentMethodForm(true)}>
              ADD CARD
            </button>
          ) : (
            <AddPaymentMethod setEditingState={setAddPaymentMethodForm} />
          )}
        </section>
      )}
    </>
  );
}
