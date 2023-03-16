import { useEffect, useState } from 'react';
import { SubscriptionCard } from '/components/cards';
import Styles from '/styles/my-subscription.module.scss';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';

export default function MySubcriptions() {
  const [allSubscriptions, setAllSubscriptions] = useState([]);

  const APIs = new AuthencticatedUserAPI();

  useEffect(() => {
    async function getData() {
      const subscriptions = await APIs.getAllUserSubscriptions();
      setAllSubscriptions(subscriptions);
    }
    getData();
  }, []);

  return (
    <section>
      <div className={Styles.subscriptionCard}>
        {allSubscriptions?.map((subscription, index) => (
          <SubscriptionCard key={index} subscription={subscription} />
        ))}
      </div>
      <div className={Styles.addSubscription}>
        <button>ADD SUBSCRIPTION</button>
      </div>
    </section>
  );
}
