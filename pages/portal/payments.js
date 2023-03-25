import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { updatePaymentMethods } from '/store/userSlice';
import { PaymentMethod } from '/components/cards';
import { AddPaymentMethod } from '/components/forms';
import Styles from '/styles/payments.module.scss';

export default function Payments() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [addPaymentMethodForm, setAddPaymentMethodForm] = useState(false);
  const { payment_methods } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const APIs = new AuthencticatedUserAPI();

  useEffect(() => {
    async function getData() {
      const newPaymentMethods = await APIs.getAllPaymentMethods();
      setPaymentMethods(newPaymentMethods);
      dispatch(updatePaymentMethods(newPaymentMethods));
    }

    if (payment_methods.length === 0) {
      getData();
    } else {
      setPaymentMethods(payment_methods);
    }
  }, [payment_methods]);

  return (
    <section className={Styles.page}>
      <div className={Styles.cardList}>
        {paymentMethods.map((paymentMethod, index) => (
          <PaymentMethod key={index} paymentMethod={paymentMethod} />
        ))}
      </div>
      {!addPaymentMethodForm ? (
        <button onClick={() => setAddPaymentMethodForm(true)}>ADD CARD</button>
      ) : (
        <AddPaymentMethod setEditingState={setAddPaymentMethodForm} />
      )}
    </section>
  );
}
