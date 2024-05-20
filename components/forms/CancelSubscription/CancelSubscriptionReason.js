import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCancelReasons } from '/store/userSlice';
import { getAllCancelReasons } from '/api';
import Styles from './cancelsubscriptionreason.module.scss';

export function CancelSubscriptionReason({
  reasonList,
  setReasonList,
  setProgress,
  otherReason,
  setOtherReason,
}) {
  const [cancelReasons, setCancelReasons] = useState([]);
  const { cancel_reasons } = useSelector((state) => state.user);
  const [showOther, setShowOther] = useState(false);
  const dispatch = useDispatch();

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      if(e.target.id === 'Other') {
        setShowOther(true);
      }
      setReasonList([...reasonList, parseInt(e.target.value)]);
    } else {
      if(e.target.id === 'Other') {
        setShowOther(false);
        setOtherReason('');
      }
      setReasonList(
        reasonList.filter(
          (reason) => reason !== parseInt(e.target.value)
        )
      );
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCancelReasons();
      setCancelReasons(data);
      dispatch(updateCancelReasons(data));
    };
    if (cancel_reasons.length === 0) {
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
      {cancelReasons?.map((reason, index) => {
        return (
          <>
          <div key={index} className={Styles.reasons}>
            <input
              type="checkbox"
              name="reason"
              value={reason.id}
              id={reason.description}
              onChange={(e) => {
                handleCheckbox(e);
              }}
            />
            <label htmlFor={reason.description}>{reason.description}</label>
          </div>
          {
            reason.description === 'Other' && (
              <div className={Styles.reasons} style={showOther ? {display:'block'}:{display:'none'}}>
                <input className={Styles.otherText} placeholder='Write reason' value={otherReason} type="text" onChange={(e)=>{setOtherReason(e.target.value)}} required={showOther ? true:false} />
              </div>
            )
          }
        </>
        );
      })}
      <div className={Styles.button}>
        <button type="submit">Skip</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
