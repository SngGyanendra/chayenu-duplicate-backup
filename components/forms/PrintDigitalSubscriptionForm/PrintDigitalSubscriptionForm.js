import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Styles from './printdigitalsubscriptionform.module.scss';
import { initializeBraintree } from '/components/common';
import { PlanCard } from '/components/cards';
import { Summary, Coupon } from '/components/forms';
import { getAllPlans, addNewSubscription } from '/api';
import * as Yup from 'yup';

export function PrintDigitalSubscriptionForm({ selectedProduct }) {
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [coupon, setCoupon] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [require_cc, setRequire_cc] = useState(true);

  useEffect(() => {
    initializeBraintree(setBraintreeInstance);
  }, [selectedPlan, require_cc]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllPlans(selectedProduct.id);
      setAllPlans(data);

      const countryList = data.map((plan) => plan.country);
      const uniqueCountries = [
        ...new Map(
          countryList.map((country) => [country.id, country])
        ).values(),
      ];
      setCountriesList(uniqueCountries);
      if (uniqueCountries.length === 1) {
        selectedCountry(uniqueCountries[0]);
      }
    })();

    setSelectedPlan(undefined);
  }, [selectedProduct]);

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

  const initialValues = {
    first_name: undefined,
    last_name: undefined,
    organization: undefined,
    address_1: undefined,
    address_2: undefined,
    zip_code: undefined,
    email: undefined,
    mobile: undefined,
    coupon: undefined,
    is_trail: false,
    quantity: undefined,
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
  };

  const addSubscription = async (values, payload) => {
    const finalValues = {
      ...values,
      quantity: parseInt(values.quantity),
      plan: selectedPlan?.id,
      coupon: coupon?.code,
      country: selectedCountry?.id,
      ...(require_cc && { card_nonce: payload.nonce }),
    };
    try {
      const response = await addNewSubscription(finalValues);
    } catch (error) {
      console.log(error);
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
    quantity: Yup.number()
      .min(0, 'Minimunt quantity is 1')
      .max(10, 'Maximum quantity is 1')
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
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().trim().required('State is required'),
  });

  return (
    <div className={Styles.formWrapper}>
      {allPlans.length > 0 && (
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (braintreeInstance) {
              return braintreeInstance.requestPaymentMethod(
                async (error, payload) => {
                  setLoading(true);
                  if (error) {
                    setLoading(false);
                    return null;
                  }
                  await addSubscription(values, payload);
                }
              );
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
            <form className={Styles.form} onSubmit={handleSubmit}>
              {countriesList.find((country) => country.name === 'USA') &&
                countriesList.length > 1 && (
                  <div className={Styles.country}>
                    <div className={Styles.selectCountry}>Select Location</div>
                    <div className={Styles.location}>
                      <div
                        className={Styles.countryType}
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
                        className={Styles.countryType}
                        onClick={() => {
                          setSelectedCountry('others');
                        }}
                      >
                        International
                      </div>
                    </div>
                  </div>
                )}
              {selectedCountry.name !== 'USA' && (
                <div className={Styles.selectCountry}>
                  <select
                    name="country"
                    onChange={(e) => {
                      console.log(e.target.value);
                      const country = countriesList.find((country) => {
                        return country.id == e.target.value;
                      });
                      setSelectedCountry(country);
                    }}
                  >
                    <option value="default">Select a country</option>
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
              {selectedCountry && selectedCountry !== 'others' && (
                <div className={Styles.plan}>
                  <div className={Styles.selectPlan}>Select a Plan</div>
                  <div className={Styles.plansContainer}>
                    {allPlans
                      .filter(
                        (plan) => plan?.country?.id === selectedCountry?.id
                      )
                      .map((plan, index) => (
                        <PlanCard
                          key={index}
                          plan={plan}
                          setSelectedPlan={setSelectedPlan}
                        />
                      ))}
                  </div>
                </div>
              )}
              {selectedPlan && (
                <div className={Styles.formGrid}>
                  <label>
                    First Name
                    <input
                      type="text"
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
                    Last Name
                    <input
                      type="text"
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
                  <label className={Styles.organization}>
                    Organization
                    <input
                      type="text"
                      name="organization"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.organization}
                    />
                  </label>
                  <label>
                    Street Address
                    <input
                      type="text"
                      name="address_1"
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
                    Apt, Floor, Unit, etc. (optional)
                    <input
                      type="text"
                      name="address_2"
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
                  <div className={Styles.locationDiv}>
                    <label>
                      City
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                      />
                      <span className={Styles.error}>
                        {errors.city && touched.city && errors.city}
                      </span>
                    </label>
                    <label>
                      State
                      <select name="state" id="" value={values.state}>
                        <option value="1">1</option>
                      </select>
                      <span className={Styles.error}>
                        {errors.state && touched.state && errors.state}
                      </span>
                    </label>
                    <label>
                      Zip Code
                      <input
                        type="number"
                        name="zip_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip_code}
                      />
                      <span className={Styles.error}>
                        {errors.zip_code && touched.zip_code && errors.zip_code}
                      </span>
                    </label>
                  </div>
                  <label>
                    Email
                    <input
                      type="email"
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
                    Phone Number
                    <PhoneInput
                      name="mobile"
                      mask="#"
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
                  <div className={Styles.heading}>Payment Details</div>
                  {require_cc && (
                    <div
                      className={Styles.dropinContainer}
                      id="dropin-container"
                    ></div>
                  )}
                  <Coupon
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    selectedPlan={selectedPlan}
                    coupon={coupon}
                    setCoupon={setCoupon}
                  />
                  <div className={Styles.heading}>Summary</div>
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
                    className={Styles.submit}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
