import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllCancelReasons } from '/api';
import Styles from './cancelsubscriptionreason.module.scss';

export function CancelSubscriptionReason({ reasonList, setReasonList, setProgress }) {
  const [cancelReasons, setCancelReasons] = useState([]);
  const { cancel_reasons } = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCancelReasons();
      setCancelReasons(data);
    };
    if (cancelReasons.length === 0) {
      getData();
    } else {
      setCancelReasons(cancel_reasons);
    }
  }, []);

  return (
    <form
      className={Styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setProgress('confirmCancellation');
      }}
    >
      <div>Why Are You Canceling Your Subscription?</div>
      {cancelReasons?.map((reason, index) => (
        <div key={index} className={Styles.reasons}>
          <input
            type="checkbox"
            name="reason"
            value={reason.id}
            id={reason.description}
            onChange={(e) => {
              if (e.target.checked) {
                setReasonList([...reasonList, parseInt(e.target.value)]);
              } else {
                setReasonList(
                  reasonList.filter(
                    (reason) => reason !== parseInt(e.target.value)
                  )
                );
              }
            }}
          />
          <label htmlFor={reason.description}>{reason.description}</label>
        </div>
      ))}
      <div className={Styles.button}>
        <button type="submit">Skip</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
