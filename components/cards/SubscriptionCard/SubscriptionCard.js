import { useState } from 'react';
import Styles from './subscriptioncard.module.scss';
import { useDispatch } from 'react-redux';
import { updateSubscriptions, updateTransactions } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import toast from 'react-hot-toast';
import { useWindowDimensions } from '/hooks';
import { formatDate } from '/util';
import { Popup, toastTemplate } from '/components/common';
import {
  TransferSubscriptions,
  CancelSubscription,
  UpdateShippingInfo,
  ChangePaymentMethod,
} from '/components/forms';

export function SubscriptionCard({ subscription, setLoading }) {
  const { width } = useWindowDimensions();
  const [popup, setPopup] = useState(undefined);
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const APIs = new AuthencticatedUserAPI();

  const filteredSubscriptionData = (({
    plans,
    status,
    end_date,
    paymentMethod,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    states,
    auto_renew,
    countries,
    zip_code,
    next_bill_date,
    quantity,
  }) => ({
    plans,
    status,
    end_date,
    paymentMethod,
    auto_renew,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    quantity,
    states,
    countries,
    next_bill_date,
    zip_code,
  }))(subscription);

  Object.keys(filteredSubscriptionData).forEach((key) =>
    filteredSubscriptionData[key] === undefined
      ? delete filteredSubscriptionData[key]
      : {}
  );

  function countValidKeys(obj) {
    let count = 0;
    for (const key in obj) {
      if (key === 'address_1' && obj[key] !== null) {
        count++;
      } else if (key === 'city' && obj[key] !== null) {
        count++;
      } else if (key === 'states' && obj[key] !== null) {
        count++;
      } else if (key === 'countries' && obj[key] !== null) {
        count++;
      } else if (key === 'zip_code' && obj[key] !== null) {
        count++;
      } else if (key === 'plans' && obj[key] !== null) {
        count++;
      } else if (key === 'status' && obj[key] !== null) {
        count++;
      } else if (
        key === 'end_date' &&
        obj[key] !== null &&
        filteredSubscriptionData.auto_renew === false
      ) {
        count++;
      } else if (
        key === 'next_bill_date' &&
        obj[key] !== null &&
        filteredSubscriptionData.auto_renew === true
      ) {
        count++;
      } else if (key === 'first_name' && obj[key] !== null) {
        count++;
      } else if (key === 'paymentMethod' && obj[key] !== null) {
        count++;
      } else if (key === 'quantity' && obj[key] !== null) {
        count++;
      }
    }
    if (width > 770) {
      if (count > 6) return 6;
    }
    return count;
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Active':
        return Styles.active;
      case 'Expired':
        return Styles.expired;
      case 'Processing':
        return Styles.processing;
      case 'On Hold':
        return Styles.onhold;
      case 'Cancelled':
        return Styles.expired;
      default:
        return 'Invalid status.';
    }
  }

  function formatSubscriptionDetail(key, value, object) {
    let html;
    switch (key) {
      case 'plans':
        html = (
          <div>
            <span className={Styles.keys}>Plan:</span>
            <span className={Styles.value}>{value.name}</span>
          </div>
        );
        break;
      case 'status':
        if (value === 'On_Hold') value = 'On Hold';
        html = (
          <div>
            <span className={Styles.keys}>Status:</span>
            <span className={`${Styles.value} ${getStatusClass(value)}`}>
              {value}
            </span>
          </div>
        );
        break;
      case 'end_date':
        if (filteredSubscriptionData.auto_renew === true) break;
        html = (
          <div>
            <span className={Styles.keys}>End Date:</span>
            <span className={Styles.value}>{formatDate(value)}</span>
          </div>
        );
        break;
      case 'next_bill_date':
        if (filteredSubscriptionData.auto_renew === false) break;
        html = (
          <div>
            <span className={Styles.keys}>Next Bill Date:</span>
            <span className={Styles.value}>{formatDate(value)}</span>
          </div>
        );
        break;
      case 'first_name':
        html = (
          <div>
            <span className={Styles.keys}>Name:</span>
            <span
              className={Styles.value}
            >{`${value} ${object.last_name}`}</span>
            <span
              className={Styles.updateInfo}
              onClick={() => {
                setPopup('updateInfo');
              }}
            >
              UPDATE INFO
            </span>
          </div>
        );
        break;
      case 'address_1':
        if (value == null) break;
        html = (
          <div>
            <span className={Styles.keys}>Address:</span>
            <span className={Styles.value}>{`${value} ${
              object.address_2 ? object.address_2 : ''
            }`}</span>
          </div>
        );
        break;
      case 'city':
        if (value == null) break;
        html = (
          <div>
            <span className={Styles.keys}>City:</span>
            <span className={Styles.value}>{value}</span>
          </div>
        );
        break;
      case 'states':
        if (value == null) break;
        html = (
          <div>
            <span className={Styles.keys}>State:</span>
            <span className={Styles.value}>{value.name}</span>
          </div>
        );
        break;
      case 'countries':
        if (value == null) break;
        html = (
          <div>
            <span className={Styles.keys}>Country:</span>
            <span className={Styles.value}>{value.name}</span>
          </div>
        );
        break;
      case 'zip_code':
        if (value == null) break;
        html = (
          <div>
            <span className={Styles.keys}>Zip Code:</span>
            <span className={Styles.value}>{value}</span>
          </div>
        );
        break;
      case 'paymentMethod':
        html = (
          <div>
            <span className={Styles.keys}>Payment Method:</span>
            <span className={Styles.value}>
              {`${value.card_type} ${value?.number?.slice(-4)}`}
            </span>
            <span
              className={Styles.updateInfo}
              onClick={() => {
                setPopup('updatePaymentMethod');
              }}
            >
              CHANGE
            </span>
          </div>
        );
        break;
      case 'quantity':
        html = (
          <div>
            <span className={Styles.keys}>Quantity:</span>
            <span className={Styles.value}>{value}</span>
          </div>
        );
        break;
      default:
        break;
    }
    return html;
  }

  return (
    <>
      <div className={Styles.subscriptionCard}>
        {!subscription.auto_renew &&
          new Date().toISOString() < subscription.end_date &&
          subscription.status !== 'Expired' && (
            <div className={Styles.expiringSubscriptionWarning}>
              Your subscription will end on {formatDate(subscription.end_date)}
            </div>
          )}
        <div
          className={Styles.subscriptionDetails}
          style={{
            gridTemplateRows: `repeat(${countValidKeys(
              filteredSubscriptionData
            )},1fr)`,
          }}
        >
          {Object.entries(filteredSubscriptionData).map(([key, value]) =>
            formatSubscriptionDetail(key, value, filteredSubscriptionData)
          )}
        </div>
        <div className={Styles.subscritpionButtons}>
          {!filteredSubscriptionData?.auto_renew ? (
            !filteredSubscriptionData.plans.student_only && (
              <button
                disabled={disabled}
                className={disabled ? `${Styles.disabled}` : ''}
                onClick={async () => {
                  const loadingToast = toastTemplate(
                    toast.loading,
                    'Reactivating'
                  );
                  try {
                    setDisabled(true);
                    if (filteredSubscriptionData.status === 'Expired') {
                      const response = await APIs.reactivateSubscription(
                        subscription.id
                      );
                    } else {
                      const response = await APIs.toggleAutoRenew(
                        subscription.id
                      );
                    }
                    toastTemplate(
                      toast.success,
                      'Subscription reactivated successfully',
                      loadingToast
                    );
                    setLoading(true);
                    const newSubscriptionsList =
                      await APIs.getAllUserSubscriptions();
                    dispatch(updateSubscriptions(newSubscriptionsList));
                    setLoading(false);
                    setDisabled(false);
                    const newTransactionList =
                      await APIs.getAllUserTransactions();
                    dispatch(updateTransactions(newTransactionList));
                  } catch (error) {
                    toastTemplate(
                      toast.error,
                      'Reactivation failed\n try updating credit card',
                      loadingToast
                    );
                    setDisabled(false);
                    setLoading(false);
                  }
                }}
              >
                REACTIVATE SUBSCRIPTION
              </button>
            )
          ) : (
            <>
              <button
                onClick={() => {
                  setPopup('transfer');
                }}
              >
                TRANSFER
              </button>
              <button
                onClick={() => {
                  setPopup('cancel');
                }}
              >
                CANCEL SUBSCRIPTION
              </button>
            </>
          )}
        </div>

        {(() => {
          if (popup === 'transfer') {
            return (
              <Popup setPopupState={setPopup}>
                <TransferSubscriptions
                  subscription={subscription}
                  setPopupState={setPopup}
                />
              </Popup>
            );
          } else if (popup === 'cancel') {
            return (
              <Popup setPopupState={setPopup}>
                <CancelSubscription
                  subscription={subscription}
                  setPopupState={setPopup}
                />
              </Popup>
            );
          } else if (popup === 'updateInfo') {
            return (
              <Popup setPopupState={setPopup}>
                <UpdateShippingInfo
                  subscription={subscription}
                  setPopupState={setPopup}
                />
              </Popup>
            );
          } else if (popup === 'updatePaymentMethod') {
            return (
              <Popup setPopupState={setPopup}>
                <ChangePaymentMethod
                  subscription={subscription}
                  setPopupState={setPopup}
                />
              </Popup>
            );
          }
        })()}
      </div>
    </>
  );
}
