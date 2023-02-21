import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Styles from './digitalsubscriptionform.module.scss';
import { initializeBraintree } from '/components/common';
import { PlanCard } from '/components/cards';
import { Summary, Coupon } from '/components/forms';
import { getAllPlans, addNewSubscription } from '/api';
import * as Yup from 'yup';

export function DigitalSubscriptionForm({ selectedProduct }) {
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
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

  const addSubscription = async (values, payload) => {
    const finalValues = {
      ...values,
      quantity: parseInt(values.quantity),
      plan: selectedPlan?.id,
      coupon: coupon?.code,
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
              <div className={Styles.plan}>
                <div className={Styles.selectPlan}>Select a Plan</div>
                <div className={Styles.plansContainer}>
                  {allPlans.map((plan, index) => (
                    <PlanCard
                      key={index}
                      plan={plan}
                      setSelectedPlan={setSelectedPlan}
                    />
                  ))}
                </div>
              </div>
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
                      useNationalFormatForDefaultCountryValue={true}
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
