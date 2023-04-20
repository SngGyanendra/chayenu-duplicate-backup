import Link from 'next/link';
import Styles from './successfulsubscription.module.scss';

export function SuccessfulSubscription({ selectedPlan, setPopupState }) {
  return (
    <div className={Styles.subscriptionCard}>
      <div className={Styles.success}>Success!</div>
      <div className={Styles.text}>You have successfully subscribed to</div>
      <div className={Styles.text}>
        {selectedPlan?.product?.name} {selectedPlan?.recurring} plan
      </div>
      <div className={Styles.login}>
        <Link className={Styles.loginlink} href="/login">
          Login
        </Link>{' '}
        to the portal to manage your account
      </div>
      <button onClick={() => setPopupState(undefined)}>Ok</button>
    </div>
  );
}
