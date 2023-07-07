import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  initializeCustomBraintree,
  Popup,
  toastTemplate,
} from '../../../components/common';
import Select from 'react-select';
import { Formik } from 'formik';
import { validateCreditCard } from '/util';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Styles from './printdigitalsubscriptionform.module.scss';
import {
  PlanCard,
  CountryLoadingSkeleton,
  SuccessfulSubscription,
} from '../../../components/cards';
import { Summary, Coupon } from '../../../components/forms';
import {
  getAllPlans,
  getAllColleges,
  addNewSubscription,
  getTrialProduct,
} from '../../../api';
import * as Yup from 'yup';

export function PrintDigitalSubscriptionForm({
  selectedProduct,
  student_only,
  is_military_only,
  autoScroll,
  is_trial = false,
}) {
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [deliveryType, setDeliveryType] = useState(undefined);
  const [distributor, setDistributor] = useState();
  const [hostedFields, setHostedFields] = useState();
  const [coupon, setCoupon] = useState(undefined);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [allPaymentMethods, setAllPaymentMethods] = useState();
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState('');
  const [allColleges, setAllColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState();
  const [cardErrors, setCardErrors] = useState({
    cvv: undefined,
    number: undefined,
    expiry: undefined,
  });
  const [require_cc, setRequire_cc] = useState(true);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { payment_methods } = useSelector((state) => state.user);

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
      let data = [];
      if (is_trial) {
        const { data: products } = await getTrialProduct();
        const product = products[0];
        data = product.plans;
      } else {
        const { data: plans } = await getAllPlans(selectedProduct.id, {
          is_military_only,
          student_only,
          is_trial,
        });
        data = plans;
      }
      const { data: colleges } = await getAllColleges();
      setAllColleges(colleges);
      setAllPlans(data);

      let countryList = data.map((plan) => plan.country);
      countryList = countryList.filter((country) => country !== null);
      const uniqueCountries = [
        ...new Map(
          countryList.map((country) => [country.id, country])
        ).values(),
      ];
      setCountriesList(uniqueCountries);
      if (uniqueCountries.length === 1) {
        setSelectedCountry(uniqueCountries[0]);
      }
    })();
    setSelectedPlan(undefined);
  }, [selectedProduct, student_only, is_military_only]);

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

  useEffect(() => {
    if (typeof selectedCountry === 'object') {
      if (selectedCountry?.has_distributors) {
        setDeliveryType('distributor');
      } else {
        setDeliveryType('shipping');
      }
    } else {
      setDeliveryType('shipping');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (allPlans.length === 1) {
      setSelectedPlan(allPlans[0]);
    }
  }, [allPlans]);

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

  const collegesStyle = {
    ...style,
    menu: (defaultStyles) => ({
      ...defaultStyles,
      marginTop: '0px',
      top: '110%',
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

  function formatCollegeName(college) {
    return (
      <div className={Styles.stylePaymentMethods}>
        {`${college.college_name} (Rabbi & ${college.last_name})`}
      </div>
    );
  }

  const initialValues = {
    first_name: undefined,
    last_name: undefined,
    organization: undefined,
    address_1: undefined,
    distributor: undefined,
    address_2: undefined,
    zip_code: undefined,
    email: undefined,
    mobile: undefined,
    coupon: undefined,
    is_trial:
      is_trial &&
      selectedPlan &&
      selectedPlan.recurring === 'Yearly' &&
      selectedPlan.country &&
      selectedPlan.country.name === 'USA',
    quantity: 1,
    plan: undefined,
    city: undefined,
    college: undefined,
    country: undefined,
    state: undefined,
    auto_renew: true,
    card_nonce: undefined,
  };

  const initialErrors = {
    first_name: undefined,
    last_name: undefined,
    address_1: undefined,
    address_2: undefined,
    email: undefined,
    city: undefined,
    coupon: undefined,
    college: undefined,
    country: undefined,
    state: undefined,
    quantity: 1,
    plan: undefined,
    distributor: undefined,
  };

  const addSubscription = async (values, nonce) => {
    const finalValues = {
      ...values,
      quantity: parseInt(values.quantity),
      plan: selectedPlan?.id,
      coupon: coupon?.code,
      ...(selectedCollege && { college: selectedCollege?.id }),
      country: selectedCountry?.id,
      ...(require_cc && { card_nonce: nonce }),
      ...(values.state && { state: parseInt(values.state) }),
      ...(paymentMethod &&
        paymentMethod !== 'other' && { card_token: paymentMethod }),
      is_trial:
        is_trial &&
        selectedPlan &&
        selectedPlan.recurring === 'Yearly' &&
        selectedPlan.country &&
        selectedPlan.country.name === 'USA',
    };
    try {
      const response = await addNewSubscription(finalValues);
      setLoading(false);
      setPopup('successfulSubscription');
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong! Please try again later';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message 
        ) {
          if (error.response.data.message === "server.trial.is_used") {
            message = 'You have alread used a trial before';
          } else {
            message = error.response.data.message
          }
      }

      toastTemplate(toast.error, message);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(2, 'Too short!')
      .max(50, 'Too long')
      .required('First name is required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for first name.'),
    last_name: Yup.string()
      .trim()
      .min(2, 'Too short!')
      .max(50, 'Too long')
      .required('Last Name is required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for last name.'),
    email: Yup.string()
      .trim()
      .email('Enter valid email')
      .required('Email is required'),
    coupon: Yup.string('Coupon needs to be a string').trim(),
    organization: Yup.string().trim(),
    quantity: Yup.number()
      .min(0, 'Minimunt quantity is 1')
      .max(10, 'Maximum quantity is 10')
      .required('Quantity is required')
      .positive('Quantity needs to be positive')
      .integer('Quantity needs to be an integer'),
    mobile: Yup.string()
      .required('Phone is required')
      .test('phone is valid', 'Invalid contact', (value) => {
        if (value) {
          return isValidPhoneNumber(value);
        } else {
          return false;
        }
      }),
    address_1: Yup.string().when('mobile', {
      is: () =>
        (selectedCountry?.has_shipping && deliveryType === 'shipping') ||
        selectedCountry?.name === 'USA',
      then: () => Yup.string().trim().required('Street address is required'),
    }),
    address_2: Yup.string().trim(),
    city: Yup.string().when({
      is: () =>
        (selectedCountry?.has_shipping && deliveryType === 'shipping') ||
        selectedCountry?.name === 'USA',
      then: () => Yup.string().trim().required('City is required'),
    }),
    state: Yup.number().when({
      is: () =>
        (selectedCountry?.has_shipping &&
          deliveryType === 'shipping' &&
          selectedCountry?.states?.length > 0) ||
        selectedCountry?.name === 'USA',
      then: () => Yup.number().required('state is required'),
    }),
    zip_code: Yup.string().when({
      is: () =>
        (selectedCountry?.has_shipping && deliveryType === 'shipping') ||
        selectedCountry?.name === 'USA',
      then: () => Yup.string().trim().required('postal code is required'),
    }),
  });

  return (
    <div className={Styles.formWrapper}>
      {!allPlans.length && <CountryLoadingSkeleton />}
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
            <form onSubmit={handleSubmit}>
              {countriesList.find((country) => country.name === 'USA') &&
                countriesList.length > 1 && (
                  <div className={Styles.form}>
                    {
                      <>
                        <div className={Styles.country} ref={autoScroll}>
                          <div className={Styles.selectCountry}>
                            SELECT LOCATION
                          </div>
                          <div className={Styles.location}>
                            <div
                              className={`${Styles.countryType} ${
                                selectedCountry?.name === 'USA'
                                  ? Styles.selectCountry
                                  : ''
                              }`}
                              onClick={() => {
                                setSelectedCountry(
                                  countriesList?.find(
                                    (country) => country.name === 'USA'
                                  )
                                );
                              }}
                            >
                              USA
                            </div>
                            <div
                              className={`${Styles.countryType} ${
                                selectedCountry?.name !== 'USA' &&
                                selectedCountry !== undefined
                                  ? Styles.selectCountry
                                  : ''
                              }`}
                              onClick={() => {
                                setSelectedCountry('others');
                              }}
                            >
                              International
                            </div>
                          </div>
                        </div>
                      </>
                    }
                    {selectedCountry && selectedCountry?.name !== 'USA' && (
                      <div className={Styles.selectCountry}>
                        <select
                          name="country"
                          onChange={(e) => {
                            const country = countriesList.find((country) => {
                              return country.id == e.target.value;
                            });
                            setSelectedCountry(country);
                          }}
                        >
                          <option value="default" hidden={true}>
                            Select a country
                          </option>
                          {countriesList
                            .filter((country) => country.name !== 'USA')
                            .map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                    {selectedCountry &&
                      selectedCountry?.name !== 'USA' &&
                      selectedCountry.has_distributors && (
                        <div className={Styles.selectDistributor}>
                          <select
                            name="distributor"
                            onChange={(e) => {
                              values.distributor = e.target.value;
                              setDistributor(e.target.value);
                            }}
                          >
                            <option value="default" hidden={true}>
                              Choose a distributor
                            </option>
                            {selectedCountry?.distributors?.map(
                              (distributor) => (
                                <option
                                  key={distributor.id}
                                  value={distributor.id}
                                >
                                  {`${distributor.first_name} ${
                                    distributor.last_name
                                  } - ${
                                    distributor?.address_1
                                      ? `${distributor?.address_1},`
                                      : ''
                                  } ${
                                    distributor?.address_2
                                      ? `${distributor?.address_2},`
                                      : ''
                                  } ${
                                    distributor?.city
                                      ? `${distributor?.city},`
                                      : ''
                                  } ${
                                    distributor?.state
                                      ? `${distributor?.state},`
                                      : ''
                                  } ${distributor?.country?.name}`}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                  </div>
                )}
              {(countriesList?.length <= 1 ||
                (selectedCountry !== 'others' && selectedCountry)) &&
                (deliveryType === 'shipping' || distributor) &&
                allPlans.length > 1 && (
                  <div className={Styles.form}>
                    <div className={Styles.plan}>
                      <div className={Styles.selectPlan}>SELECT PLAN</div>
                      <div className={Styles.plansContainer}>
                        {allPlans
                          .filter(
                            (plan) => plan?.country?.id === selectedCountry?.id
                          )
                          .map((plan, index) => (
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
                )}

              {selectedPlan?.student_only && (
                <div className={Styles.form}>
                  <div className={Styles.college}>College</div>
                  <Select
                    name="colleges"
                    options={allColleges}
                    styles={collegesStyle}
                    placeholder={'Select a college'}
                    className={Styles.selectCollegesDropdown}
                    getOptionValue={(option) => option.id}
                    id="colleges"
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
                selectedPlan &&
                selectedCountry !== 'others' && (
                  <div className={Styles.form}>
                    <div className={Styles.selectCountry}>
                      {selectedCountry.has_distributors
                        ? 'CONTACT INFO'
                        : 'SHIPPING INFO'}
                    </div>
                    <div className={Styles.nameSection}>
                      <label>
                        <input
                          type="text"
                          placeholder="First Name"
                          name="first_name"
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
                          name="last_name"
                          placeholder="Last Name"
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
                    <>
                      {deliveryType === 'shipping' && (
                        <>
                          <label>
                            <input
                              type="text"
                              name="address_1"
                              placeholder="Street Address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address_1}
                            />
                            <span className={Styles.error}>
                              {errors.address_1 &&
                                touched.address_1 &&
                                errors.address_1}
                            </span>
                          </label>
                          <label>
                            <input
                              type="text"
                              name="address_2"
                              placeholder="Apt, Floor, Unit, etc. (optional)"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.address_2}
                            />
                            <span className={Styles.error}>
                              {errors.address_2 &&
                                touched.address_2 &&
                                errors.address_2}
                            </span>
                          </label>

                          <div className={Styles.location}>
                            <label>
                              <input
                                type="text"
                                name="city"
                                placeholder="City"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                              />
                              <span className={Styles.error}>
                                {errors.city && touched.city && errors.city}
                              </span>
                            </label>
                            {selectedCountry?.states?.length > 0 && (
                              <label>
                                <select
                                  name="state"
                                  id=""
                                  placeholder="State"
                                  value={values.state}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option value="" hidden={true}>
                                    State
                                  </option>
                                  {selectedCountry?.states?.map((state) => (
                                    <option key={state.id} value={state.id}>
                                      {state.name}
                                    </option>
                                  ))}
                                </select>
                                <span className={Styles.error}>
                                  {errors.state &&
                                    touched.state &&
                                    errors.state}
                                </span>
                              </label>
                            )}
                          </div>
                        </>
                      )}
                      <div className={Styles.location}>
                        {deliveryType === 'shipping' && (
                          <label>
                            <input
                              type="text"
                              name="zip_code"
                              placeholder="Postal Code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.zip_code}
                            />
                            <span className={Styles.error}>
                              {errors.zip_code &&
                                touched.zip_code &&
                                errors.zip_code}
                            </span>
                          </label>
                        )}
                        <label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            label="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span className={Styles.error}>
                            {errors.email && touched.email && errors.email}
                          </span>
                        </label>
                      </div>
                      <label>
                        <PhoneInput
                          name="mobile"
                          mask="#"
                          placeholder="Mobile Number"
                          countrySelectProps={{ unicodeFlags: false }}
                          withCountryCallingCode={false}
                          className={Styles.phoneInput}
                          onChange={(value) => {
                            values.mobile = value;
                          }}
                        />
                        <span className={Styles.error}>
                          {errors.mobile && touched.mobile && errors.mobile}
                        </span>
                      </label>
                    </>
                  </div>
                )}
              {(!selectedPlan?.student_only || selectedCollege) &&
                selectedPlan && (
                  <>
                    <div className={`${Styles.form} ${Styles.paymentInfo}`}>
                      <div className={Styles.selectCountry}>PAYMENT INFO</div>
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
                      <div className={Styles.selectCountry}>SUMMARY</div>
                      <Summary
                        selectedPlan={selectedPlan}
                        autoRenewal={values.auto_renew}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        coupon={coupon}
                        showTrialMessage={is_trial}
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
