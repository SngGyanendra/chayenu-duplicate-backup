import { useDispatch } from 'react-redux';
import Styles from './confirmcancellation.module.scss';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { isoToCustomDate } from '/util';
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
          try {
            const response = await APIs.cancelSubscription(
              subscription.id,
              reasonList
            );
            const subscriptions = await APIs.getAllUserSubscriptions();
            dispatch(updateSubscriptions(subscriptions));
            setProgress('reactivationMessage');
          } catch (error) {}
        }}
      >
        End Subcsription {isoToCustomDate(subscription.end_date)}
      </button>
    </form>
  );
}
