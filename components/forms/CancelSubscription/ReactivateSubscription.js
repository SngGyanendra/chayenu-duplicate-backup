import { useDispatch } from 'react-redux';
import Styles from './reactivatesubscription.module.scss';
import { updateSubscriptions } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';
import { isoToCustomDate } from '/util';

export function ReactivateSubscription({ subscription, setPopupState }) {
  const dispatch = useDispatch();
  const APIs = new AuthencticatedUserAPI();

  return (
    <form
      className={Styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>Your request has been submitted.</div>
      <div className={Styles.subscriptionEnding}>
        Your subscription is ending{' '}
        <span className={Styles.date}>
          {isoToCustomDate(subscription.end_date)}
        </span>
      </div>
      <div className={Styles.subscriptionEnding}>
        To stop deliveries contact us: info@chayenu.org
      </div>
      <div className={Styles.buttonContainer}>
        <button
          onClick={async () => {
            const loadingToast = toastTemplate(toast.loading, 'Reactivating');
            try {
              const response = await APIs.reactivateSubscription(
                subscription.id
              );
              toastTemplate(
                toast.success,
                'Subscription reactivated successfully',
                loadingToast
              );
              const subscriptions = await APIs.getAllUserSubscriptions();
              dispatch(updateSubscriptions(subscriptions));
              setPopupState(undefined);
            } catch (error) {
              toastTemplate(
                toast.error,
                'Reactivation failed\n try updating credit card',
                loadingToast
              );
            }
          }}
        >
          Reactivate Subscription
        </button>
        <button
          onClick={() => {
            setPopupState(undefined);
          }}
        >
          Ok
        </button>
      </div>
    </form>
  );
}
