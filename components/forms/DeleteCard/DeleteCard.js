import toast from 'react-hot-toast';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { toastTemplate } from '/components/common';
import { updatePaymentMethods } from '/store/userSlice';
import { useDispatch } from 'react-redux';
import Styles from './deletecard.module.scss';
import { useState } from 'react';

export function DeleteCard({ setPopupState, paymentMethod }) {
  console.log(paymentMethod.number.slice(-4));
  const APIs = new AuthencticatedUserAPI();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <div className={Styles.deleteCard}>
      <h3>
        Please confirm that you&rsquo;d like to delete card ending in{' '}
        {paymentMethod.number.slice(-4)}
      </h3>
      <div className={Styles.button}>
        <button
          onClick={async () => {
            setLoading(true);
            const loadingToast = toastTemplate(toast.loading, 'Deleting card');
            try {
              const response = await APIs.deletePaymentMethod(
                paymentMethod.cardToken
              );
              setPopupState('');
              const newPaymentMethods = await APIs.getAllPaymentMethods();
              dispatch(updatePaymentMethods(newPaymentMethods));
              toast.custom((t) => (
                <div className={`${Styles.alert} ${Styles.success}`}>
                  <img src="/icons/icons8-checkmark.svg" alt="icon" />
                  <p>Card deleted successfully</p>
                  <span className={Styles.closeBtn} onClick={() => toast.dismiss(t.id)}>&times;</span>
                </div>
              ));
              toast.dismiss(loadingToast);
            } catch (error) {
              if (error.response !=undefined && error.response.length > 0 && error.response.data.message) {
                toastTemplate(
                  toast.error,
                  error.response.data.message,
                  loadingToast
                );
              } else {
                toastTemplate(toast.error, 'An error occured', loadingToast);
              }
            }
            setLoading(false);
          }}
          disabled={loading}
          className={loading ? Styles.disabled : ''}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setPopupState('');
          }}
          className={loading ? Styles.disabled : ''}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
