import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails, updateCountries } from '/store/userSlice';
import { getAllCountries } from '/api';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import Styles from './paymentmethod.module.scss';
import { CreditCard } from '../CreditCard/CreditCard';
import toast from 'react-hot-toast';
import { EditPaymentMethod } from '/components/forms';
import { DeleteCard } from '../../forms/DeleteCard/DeleteCard';
import { Popup } from '/components/common';

export function PaymentMethod({ paymentMethod }) {
  const APIs = new AuthencticatedUserAPI();

  const dispatch = useDispatch();
  const {
    user_details,
    countries: countriesList,
    subscriptions,
  } = useSelector((state) => state.user);

  const [userDetails, setUserDetails] = useState({});
  const [editingState, setEditingState] = useState(false);
  const [countries, setCountries] = useState([]);
  const [popup, setPopup] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await APIs.getUser();
      setUserDetails(data);
      dispatch(updateUserDetails(data));
    }
    if (Object.keys(user_details).length === 0) {
      getData();
    } else {
      setUserDetails(user_details);
    }
  }, [user_details]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCountries();
      setCountries(data);
      dispatch(updateCountries(data));
    };
    if (countriesList?.length === 0) {
      getData();
    } else {
      setCountries(countriesList);
    }
  }, [countriesList]);

  return (
    <div className={Styles.paymentMethod}>
      <CreditCard paymentMethod={paymentMethod} />
      {(() => {
        if (!editingState) {
          return (
            <div className={Styles.cardDetails}>
              <div className={Styles.cardAddress}>
                <div
                  className={`${Styles.address} ${Styles.cardAddressDetail}`}
                >
                  Billing Address:
                  <div>
                    {paymentMethod?.billingAddress?.address
                      ? `${paymentMethod?.billingAddress?.address?.substring(
                          0,
                          30
                        )}...`
                      : '...'}
                  </div>
                </div>
                <div className={Styles.cardAddressDetail}>
                  City:
                  <div>
                    {paymentMethod?.billingAddress?.city
                      ? paymentMethod?.billingAddress?.city?.substring(0, 20)
                      : '...'}
                  </div>
                </div>
                <div className={Styles.cardAddressDetail}>
                  State/Region:
                  <div>
                    {paymentMethod?.billingAddress?.state
                      ? paymentMethod?.billingAddress?.state?.substring(0, 20)
                      : '...'}
                  </div>
                </div>
                <div className={Styles.cardAddressDetail}>
                  Country:
                  <div>
                    {paymentMethod?.billingAddress?.country
                      ? paymentMethod?.billingAddress?.country?.substring(0, 30)
                      : '...'}
                  </div>
                </div>
                <div className={Styles.cardAddressDetail}>
                  Postal Code:
                  <div>
                    {paymentMethod?.billingAddress?.zip
                      ? paymentMethod?.billingAddress?.zip?.substring(0, 10)
                      : '...'}
                  </div>
                </div>
              </div>
              <div className={Styles.buttons}>
                <div>
                  <button onClick={() => setEditingState(true)}>EDIT</button>
                  <button
                    className={Styles.removeButton}
                    onClick={() => {
                      if (
                        userDetails?.default_card_id === paymentMethod.cardToken
                      ) {
                        toast.error('Cannot delete default card', {
                          duration: 6000,
                        });
                      } else if (
                        subscriptions?.some(
                          (sub) =>
                            sub.paymentMethod.token === paymentMethod.cardToken
                        )
                      ) {
                        toast.error(
                          'Card is being used in subscription(s), please change the payment method first',
                          {
                            duration: 6000,
                          }
                        );
                      } else {
                        setPopup('deleteCard');
                      }
                    }}
                  >
                    REMOVE
                  </button>
                </div>
                <div className={Styles.defaultCardId}>
                  {userDetails?.default_card_id === paymentMethod.cardToken
                    ? 'DEFAULT'
                    : ''}
                </div>
              </div>
            </div>
          );
        } else {
          const country = countries.find(
            (country) =>
              country?.braintree_name === paymentMethod?.billingAddress?.country
          )?.id;
          const state = countries
            .find(
              (country) =>
                country?.braintree_name ===
                paymentMethod?.billingAddress?.country
            )
            ?.states?.find(
              (state) => state?.name === paymentMethod?.billingAddress?.state
            )?.id;
          return (
            <EditPaymentMethod
              paymentMethod={paymentMethod}
              setEditingState={setEditingState}
              country={country}
              state={state}
            />
          );
        }
      })()}
      {(() => {
        if (popup === 'deleteCard') {
          return (
            <Popup setPopupState={setPopup}>
              <DeleteCard
                setPopupState={setPopup}
                paymentMethod={paymentMethod}
              />
            </Popup>
          );
        }
      })()}
    </div>
  );
}
