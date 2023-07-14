import { useRouter } from 'next/router';
import Styles from './supportrequestsubmitted.module.scss';

export function SupportRequestSubmitted({ requestError, redirectToPortal }) {
  const router = useRouter();

  return (
    <div className={Styles.card}>
      {requestError ? (
        requestError
      ) : (
        <div>We got your message. We will respond as soon as possible.</div>
      )}
      <button
        onClick={() => {
          if (redirectToPortal) router.push('/portal/my-subscriptions');
          else router.push('/');
        }}
      >
        Ok
      </button>
    </div>
  );
}
