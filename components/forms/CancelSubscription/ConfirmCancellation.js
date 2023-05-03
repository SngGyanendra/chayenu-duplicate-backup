import { useDispatch } from 'react-redux';
import Styles from './confirmcancellation.module.scss';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { isoToCustomDate } from '/util';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';
import { updateSubscriptions } from '/store/userSlice';

export function ConfirmCancellation({
  subscription,
  reasonList,
  setPopupState,
  setProgress,
}) {
  const APIs = new AuthencticatedUserAPI();
  const dispatch = useDispatch();

  return (
    <form
      className={Styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>Are you sure you want to end your subscription?</div>
      <button
        onClick={() => {
          setPopupState(undefined);
        }}
      >
        No. Keep My Subscription
      </button>
      <button
        onClick={async () => {
          const loadingToast = toastTemplate(toast.loading, 'Cancelling');
          try {
            const response = await APIs.toggleAutoRenew(
              subscription.id,
              // reasonList
            );
            toastTemplate(
              toast.success,
              'Subscription cancelled successfully',
              loadingToast
            );
            const subscriptions = await APIs.getAllUserSubscriptions();
            dispatch(updateSubscriptions(subscriptions));
            setProgress('reactivationMessage');
          } catch (error) {
            toastTemplate(
              toast.error,
              'Subscription cancellation failed\n contact support for further help',
              loadingToast
            );
            setPopupState(undefined)
          }
        }}
      >
        End Subcsription {isoToCustomDate(subscription.end_date)}
      </button>
    </form>
  );
}
