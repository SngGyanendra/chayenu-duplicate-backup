import { useEffect, useState, useCallback } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Styles from './digitalsubscriptionform.module.scss';
import { validateCreditCard, autoScrollToForm } from '/util';
import {
  initializeCustomBraintree,
  Popup,
  toastTemplate,
} from '/components/common';
import {
  PlanCard,
  PlanLoadingSkeleton,
  SuccessfulSubscription,
} from '/components/cards';
import { Summary, Coupon } from '/components/forms';
import { getAllPlans, getAllColleges, addNewSubscription } from '/api';
import * as Yup from 'yup';

export function DigitalSubscriptionForm({
  selectedProduct,
  student_only,
  is_military_only,
  is_shluchim_only,
  autoScroll,
}) {
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [popup, setPopup] = useState('');
  const [coupon, setCoupon] = useState(undefined);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [hostedFields, setHostedFields] = useState();
  const [allPaymentMethods, setAllPaymentMethods] = useState();
  const [loading, setLoading] = useState(false);
  const [require_cc, setRequire_cc] = useState(true);
  const [allColleges, setAllColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState();
  const [cardErrors, setCardErrors] = useState({
    cvv: undefined,
    number: undefined,
    expiry: undefined,
  });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { payment_methods } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      await initializeCustomBraintree(setHostedFields);
    }
    if (paymentMethod === 'other' || isLoggedIn === false) {
      getData();
    } else {
      setHostedFields(undefined);
    }
    if (isLoggedIn === false) {
      setPaymentMethod('other');
    }
  }, [selectedPlan, require_cc, paymentMethod, isLoggedIn]);

  useEffect(() => {
    if (payment_methods && isLoggedIn) {
      const newPaymentMethods = [...payment_methods];
      newPaymentMethods.push({ id: 'other', label: 'other' });
      setAllPaymentMethods(newPaymentMethods);
    } else if (isLoggedIn) {
      const newPaymentMethods = [];
      newPaymentMethods.push({ id: 'other', label: 'other' });
      setAllPaymentMethods(newPaymentMethods);
    }
  }, [isLoggedIn, payment_methods]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllPlans(selectedProduct.id, {
        is_military_only,
        is_shluchim_only,
        student_only,
      });
      const { data: colleges } = await getAllColleges();
      setAllColleges(colleges);
      setAllPlans(data);
    })();
    setSelectedPlan(undefined);
  }, [selectedProduct, is_military_only, student_only, is_shluchim_only]);

  useEffect(() => {
    if (typeof coupon === 'object') {
      if (coupon.require_cc) {
        setRequire_cc(true);
      } else {
        setRequire_cc(false);
      }
    } else {
      setRequire_cc(true);
    }
  }, [coupon]);

  const autoScrollToFormRef = useCallback(
    (node) => {
      if (node != null) {
        autoScrollToForm(selectedPlan, node);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Shut up ESLint
    [selectedPlan]
  );

  const autoScrollToCollegeRef = useCallback(
    (node) => {
      if (node != null) {
        node.scrollIntoView({ behavior: 'smooth' });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Shut up ESLint
    [selectedCollege]
  );

  const style = {
    control: (provided, state) => ({
      ...provided,
      border: 0,
      boxShadow: 'none',
      fontFamily: 'Brandon Grotesque',
      fontSize: '14px',
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

  const collegesStyle = {
    ...style,
    menu: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: '0px',
      top: '110%',
    }),
  };

  function formatCollegeName(college) {
    return (
      <div className={Styles.stylePaymentMethods}>
        {`${college.college_name} (Rabbi & Mrs. ${college.last_name})`}
      </div>
    );
  }

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
    if (card.label === 'other') {
      return <div className={Styles.stylePaymentMethods}>others</div>;
    } else {
      return (
        <div className={Styles.stylePaymentMethods}>
          {getCardImage(card?.cardType)}
          {card.label}
          {`**** **** **** ${card?.number?.slice(-4)}`}
        </div>
      );
    }
  }

  const initialValues = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    mobile: undefined,
    coupon: undefined,
    is_trial: false,
    quantity: 1,
    plan: undefined,
    college: undefined,
    auto_renew: true,
    card_nonce: undefined,
  };

  const initialErrors = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    mobile: undefined,
    coupon: undefined,
    college: undefined,
    quantity: 1,
    plan: undefined,
  };

  const addSubscription = async (values, nonce) => {
    const finalValues = {
      ...values,
      quantity: parseInt(values.quantity),
      plan: selectedPlan?.id,
      ...(selectedCollege && { college: selectedCollege?.id }),
      coupon: coupon?.code,
      ...(require_cc && { card_nonce: nonce }),
      ...(paymentMethod &&
        paymentMethod !== 'other' && { card_token: paymentMethod }),
    };
    try {
      const response = await addNewSubscription(finalValues);
      // setPopup('successfulSubscription');
      router.push('/login');
      setLoading(false);
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong! Please try again later';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }
      toastTemplate(toast.error, message);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long')
      .required('First name is required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for first name.')
      .trim(),
    last_name: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long')
      .required('Last Name is required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for last name.')
      .trim(),
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required')
      .trim(),
    mobile: Yup.string()
      .required('Phone is required')
      .test('phone is valid', 'Invalid contact', (value) => {
        if (value) {
          return isValidPhoneNumber(value);
        } else {
          return false;
        }
      }),
    coupon: Yup.string('Coupon needs to be a string').trim(),
    quantity: Yup.number()
      .min(0, 'Minimunt quantity is 1')
      .max(10, 'Maximum quantity is 1')
      .required('Quantity is required')
      .positive('Quantity needs to be positive')
      .integer('Quantity needs to be an integer'),
  });

  return (
    <div className={Styles.formWrapper}>
      {!allPlans.length && <PlanLoadingSkeleton />}
      {popup === 'successfulSubscription' && (
        <Popup setPopupState={setPopup}>
          <SuccessfulSubscription
            setPopupState={setPopup}
            selectedPlan={selectedPlan}
          />
        </Popup>
      )}
      {allPlans.length > 0 && (
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            if (!paymentMethod) {
              toastTemplate(toast.error, 'Please select a payment method');
              setLoading(false);
              return;
            }
            if (hostedFields) {
              if (!validateCreditCard(hostedFields.getState(), setCardErrors)) {
                setLoading(false);
                return;
              }
              let cardNonce;
              try {
                const { nonce } = await hostedFields.tokenize();
                cardNonce = nonce;
              } catch (error) {
                setCardErrors({
                  cvv: 'Recheck CVV',
                  number: 'Recheck Card Number',
                  expirationDate: 'Recheck Expiration Date',
                });
                setLoading(false);
              }
              await addSubscription(values, cardNonce);
            } else {
              await addSubscription(values);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className={Styles.formWrapper} onSubmit={handleSubmit}>
              <div className={Styles.form} ref={autoScroll}>
                <div className={Styles.plan}>
                  <div className={Styles.selectPlan}>Select a Plan</div>
                  <div className={Styles.plansContainer}>
                    {allPlans.map((plan, index) => (
                      <PlanCard
                        key={index}
                        plan={plan}
                        selectedPlan={selectedPlan}
                        setSelectedPlan={setSelectedPlan}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {selectedPlan?.student_only && (
                <div className={Styles.form} ref={autoScrollToCollegeRef}>
                  <div className={Styles.college}>College</div>
                  <Select
                    name="colleges"
                    options={allColleges}
                    styles={collegesStyle}
                    placeholder={'Select a college'}
                    className={Styles.selectCollegesDropdown}
                    getOptionValue={(option) => option.college_name}
                    id="colleges"
                    isSearchable={true}
                    formatOptionLabel={(card) => formatCollegeName(card)}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(value) => {
                      setSelectedCollege(value);
                    }}
                  />
                </div>
              )}
              {(!selectedPlan?.student_only || selectedCollege) &&
                selectedPlan && (
                  <>
                    <div className={Styles.form} ref={autoScrollToFormRef}>
                      <div className={Styles.selectCountry}>SHIPPING INFO</div>
                      <div className={Styles.nameSection}>
                        <label>
                          <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                          />
                          <span className={Styles.error}>
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
                          </span>
                        </label>
                        <label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                          />
                          <span className={Styles.error}>
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
                          </span>
                        </label>
                      </div>
                      <label>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span className={Styles.error}>
                          {errors.email && touched.email && errors.email}
                        </span>
                      </label>
                      <label>
                        <PhoneInput
                          className={Styles.phoneInput}
                          country={'us'}
                          countryCodeEditable={false}
                          placeholder={'Mobile Number'}
                          onChange={(value, country) => {
                            const countryCode = value.slice(
                              0,
                              country.dialCode.length
                            );
                            const actualNumber = value.slice(
                              country.dialCode.length
                            );
                            const formattedOutput = `+${countryCode} ${actualNumber}`;

                            values.mobile = formattedOutput;
                          }}
                          onBlur={handleBlur}
                        />
                        <span className={Styles.error}>
                          {errors.mobile && touched.mobile && errors.mobile}
                        </span>
                      </label>
                    </div>
                  </>
                )}
              {(!selectedPlan?.student_only || selectedCollege) &&
                selectedPlan && (
                  <>
                    <div className={`${Styles.form} ${Styles.paymentInfo}`}>
                      <div className={Styles.selectCountry}>
                        Payment Details
                      </div>
                      <div className={Styles.selectPaymentMethod}>
                        <Select
                          name="payment_method"
                          options={allPaymentMethods}
                          styles={style}
                          placeholder={
                            isLoggedIn
                              ? 'Choose payment method'
                              : 'Login to see saved cards'
                          }
                          className={Styles.selectPaymentMethodDropdown}
                          getOptionValue={(option) => option.cardToken}
                          id="payment_method"
                          isDisabled={!isLoggedIn}
                          formatOptionLabel={(card) =>
                            formatPaymentMethods(card)
                          }
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          onChange={(value) => {
                            if (value.label === 'other') {
                              setPaymentMethod(value.id);
                            } else {
                              setPaymentMethod(value.cardToken);
                            }
                          }}
                        />
                        <Coupon
                          values={values}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          selectedPlan={selectedPlan}
                          coupon={coupon}
                          setCoupon={setCoupon}
                        />
                      </div>
                      {require_cc &&
                        (paymentMethod === 'other' || !isLoggedIn) && (
                          <div className={Styles.creditCard}>
                            <div className={Styles.ccnumber}>
                              <label for="cc-number">Credit Number</label>
                              <div
                                id="cc-number"
                                className={Styles.hostedFields}
                              ></div>
                              {cardErrors && (
                                <span className={Styles.error}>
                                  {cardErrors.number}
                                </span>
                              )}
                            </div>
                            <div className={Styles.expirycvv}>
                              <div>
                                <label for="cc-expiry">Expiry</label>
                                <div
                                  id="cc-expiry"
                                  className={Styles.hostedFields}
                                ></div>
                                {cardErrors && (
                                  <span className={Styles.error}>
                                    {cardErrors.expiry}
                                  </span>
                                )}
                              </div>
                              <div>
                                <label for="cc-cvv">CVV</label>
                                <div
                                  id="cc-cvv"
                                  className={Styles.hostedFields}
                                ></div>
                                {cardErrors && (
                                  <span className={Styles.error}>
                                    {cardErrors.cvv}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                    <div className={`${Styles.form} ${Styles.subscribe}`}>
                      <div className={Styles.selectCountry}>Summary</div>
                      <Summary
                        selectedPlan={selectedPlan}
                        autoRenewal={values.auto_renew}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        coupon={coupon}
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className={`${Styles.submit} ${
                          loading ? `${Styles.disabled}` : ''
                        }`}
                      >
                        Subscribe
                      </button>
                    </div>
                  </>
                )}
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
