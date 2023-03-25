import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updateSubscriptions } from '/store/userSlice';
import { SubscriptionCard } from '/components/cards';
import Styles from '/styles/my-subscription.module.scss';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';

export default function MySubcriptions() {
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.user);
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  const APIs = new AuthencticatedUserAPI();

  useEffect(() => {
    async function getData() {
      const newSubscriptions = await APIs.getAllUserSubscriptions();
      setAllSubscriptions(newSubscriptions);
      dispatch(updateSubscriptions(newSubscriptions));
    }
    if (subscriptions?.length === 0) {
      getData();
    } else {
      setAllSubscriptions(subscriptions);
    }
  }, [subscriptions]);

  return (
    <section>
      <div className={Styles.subscriptionCard}>
        {allSubscriptions?.map((subscription, index) => (
          <SubscriptionCard key={index} subscription={subscription} />
        ))}
      </div>
      <div className={Styles.addSubscription}>
        <button>
          <Link href='/subscribe'>ADD SUBSCRIPTION</Link>
        </button>
      </div>
    </section>
  );
}
