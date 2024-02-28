import toast from 'react-hot-toast';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { toastTemplate } from '/components/common';
import Styles from './deletecard.module.scss';
import { useState } from 'react';

export function DeleteCard({ setPopupState, paymentMethod }) {
  const APIs = new AuthencticatedUserAPI();
  const [loading, setLoading] = useState(false);

  return (
    <div className={Styles.deleteCard}>
      <h3>Are you sure you want to delete this card</h3>
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
              toastTemplate(
                toast.success,
                'Card deleted successfully',
                loadingToast
              );
            } catch (error) {
              console.log(error);
              console.log(error.response.data.message);
              if (error.response.data.message) {
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
