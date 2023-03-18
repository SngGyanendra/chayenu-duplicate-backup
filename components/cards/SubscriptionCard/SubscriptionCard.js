import { useState } from 'react';
import Styles from './subscriptioncard.module.scss';
import { useDispatch } from 'react-redux';
import { updateSubscriptions } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { useWindowDimensions } from '/hooks';
import { formatDate } from '/util';
import { Popup } from '/components/common';
import {
  TransferSubscriptions,
  CancelSubscription,
  UpdateShippingInfo,
} from '/components/forms';

export function SubscriptionCard({ subscription }) {
  const { width } = useWindowDimensions();
  const [popup, setPopup] = useState(undefined);

  const dispatch = useDispatch();
  const APIs = new AuthencticatedUserAPI();

  const filteredSubscriptionData = (({
    plans,
    status,
    next_bill_date,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    states,
    countries,
    zip_code,
    reactivation_requested,
  }) => ({
    plans,
    status,
    next_bill_date,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    states,
    countries,
    zip_code,
    reactivation_requested,
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
      } else if (key === 'next_bill_date' && obj[key] !== null) {
        count++;
      } else if (key === 'first_name' && obj[key] !== null) {
        count++;
      }
    }
    if (width > 770) {
      if (count > 5) return 5;
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
      case 'next_bill_date':
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
            <span
              className={Styles.value}
            >{`${value} ${object.address_2}`}</span>
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
      default:
        break;
    }
    return html;
  }

  return (
    <div className={Styles.subscriptionCard}>
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
        {(filteredSubscriptionData?.status === 'Expired' ||
          filteredSubscriptionData?.status === 'Cancelled') &&
        filteredSubscriptionData.reactivation_requested === false ? (
          <button
            onClick={async () => {
              try {
                const response = await APIs.reactivateSubscription(
                  subscription.id
                );
                const newSubscriptionsList =
                  await APIs.getAllUserSubscriptions();
                console.log(newSubscriptionsList);
                dispatch(updateSubscriptions(newSubscriptionsList));
              } catch (error) {}
            }}
          >
            REACTIVATE SUBSCRIPTION
          </button>
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
        }
      })()}
    </div>
  );
}
