import { useState, useEffect } from 'react';
import { updatePaymentMethods, updateSubscriptions } from '/store/userSlice';
import Image from 'next/image';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import Styles from './changepaymentmethod.module.scss';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';

export function ChangePaymentMethod({ subscription, setPopupState }) {
  const defaultPaymentMethod = {
    cardToken: subscription?.paymentMethod?.token,
    cardType: subscription?.paymentMethod?.card_type,
    number: subscription?.paymentMethod?.number,
  };

  const APIs = new AuthencticatedUserAPI();
  const { payment_methods } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(defaultPaymentMethod);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      let newPaymentMethods = await APIs.getAllPaymentMethods();
      setPaymentMethods(newPaymentMethods);
      dispatch(updatePaymentMethods(newPaymentMethods));
    }

    if (payment_methods?.length === 0) {
      getData();
    } else {
      setPaymentMethods(payment_methods);
    }
  }, [payment_methods]);

  const style = {
    control: (provided, state) => ({
      ...provided,
      border: 0,
      boxShadow: 'none',
      fontFamily: 'Brandon Grotesque',
      height: '2rem',
      minHeight: '2rem',
      marginTop: '.2rem',
      display: 'flex',
      alignItems: 'center',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '2rem',
      padding: '0px 8px',
    }),
    input: (provided, state) => ({
      ...provided,
      height: '2rem',
      margin: '0',
      padding: '0',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '2rem',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontFamily: 'Brandon Grotesque',
      color: '#999',
      fontWeight: '300',
      position: 'absolute',
      marginTop: '0px',
    }),
    menu: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: '0px',
      top: '75%',
    }),
  };
  function getCardImage(cardName) {
    switch (cardName) {
      case 'Visa':
        return (
          <Image src="/cards/VisaDark.svg" alt="Visa" height={20} width={40} />
        );

      case 'American Express':
        return (
          <Image
            src="/cards/AmericanExpressDark.svg"
            alt="Visa"
            height={20}
            width={40}
          />
        );
      case 'MasterCard':
        return (
          <Image
            src="/cards/mastercardDark.svg"
            alt="Visa"
            height={30}
            width={40}
          />
        );
      case 'Discover':
        return (
          <Image
            src="/cards/DiscoverDark.svg"
            alt="Visa"
            height={30}
            width={50}
          />
        );
      case 'JCB':
        return (
          <Image src="/cards/JCBDark.svg" alt="Visa" height={25} width={25} />
        );
      default:
        return '';
    }
  }

  function formatPaymentMethods(card) {
    return (
      <div className={Styles.stylePaymentMethods}>
        {getCardImage(card?.cardType)}
        {card.label}
        {`**** **** **** ${card?.number?.slice(-4)}`}
      </div>
    );
  }

  return (
    <form
      className={Styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toastTemplate(
          toast.loading,
          'Updating payment method'
        );
        try {
          const values = {
            cardToken: selectedCard?.cardToken,
            subscriptionId: subscription.id,
          };
          const response = await APIs.updateSubscriptionPaymentMethod(values);
          const newSubscriptionsList = await APIs.getAllUserSubscriptions();
          dispatch(updateSubscriptions(newSubscriptionsList));
          setLoading(false);
          setPopupState(false);
          toastTemplate(
            toast.success,
            'Payment method changed successfully',
            loadingToast
          );
        } catch (error) {
          setLoading(false);
          toastTemplate(
            toast.error,
            'Something went wrong, please try again',
            loadingToast
          );
        }
      }}
    >
      <div>Select Payment Method</div>
      <Select
        name="payment_method"
        options={paymentMethods}
        styles={style}
        placeholder={'Choose a card'}
        getOptionValue={(option) => option.cardToken}
        id="payment_method"
        defaultValue={selectedCard}
        formatOptionLabel={(card) => formatPaymentMethods(card)}
        components={{
          IndicatorSeparator: () => null,
        }}
        onChange={(value) => {
          setSelectedCard(value);
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${loading ? `${Styles.disabled}` : ''}`}
      >
        {!loading ? 'Change' : 'Changing...'}
      </button>
    </form>
  );
}
