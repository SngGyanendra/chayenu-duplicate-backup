import { useState } from 'react';
import { CancelSubscriptionReason } from './CancelSubscriptionReason';
import { ConfirmCancellation } from './ConfirmCancellation';
import { ReactivateSubscription } from './ReactivateSubscription';

export function CancelSubscription({ subscription, setPopupState }) {
  const [reasonList, setReasonList] = useState([]);
  const [progress, setProgress] = useState('selectReason');

  return (
    <>
      {(() => {
        if (progress === 'selectReason') {
          return (
            <CancelSubscriptionReason
              reasonList={reasonList}
              setReasonList={setReasonList}
              setProgress={setProgress}
            />
          );
        } else if (progress === 'confirmCancellation') {
          return (
            <ConfirmCancellation
              subscription={subscription}
              setPopupState={setPopupState}
              reasonList={reasonList}
              setProgress={setProgress}
            />
          );
        } else if (progress === 'reactivationMessage') {
          return (
            <ReactivateSubscription
              subscription={subscription}
              setPopupState={setPopupState}
            />
          );
        }
      })()}
    </>
  );
}
