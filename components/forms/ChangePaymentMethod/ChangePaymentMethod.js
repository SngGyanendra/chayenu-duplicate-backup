import { useState, useEffect } from 'react';
import { updatePaymentMethods } from '/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import Styles from './changepaymentmethod.module.scss';

export function ChangePaymentMethod({ userProfile, setPopupState }) {
  const APIs = new AuthencticatedUserAPI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { payment_methods } = useSelector((state) => state.user);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const dispatch = useDispatch();

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

  return <form></form>;
}
