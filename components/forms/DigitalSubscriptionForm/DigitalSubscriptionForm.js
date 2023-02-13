import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import PhoneInput from 'react-phone-number-input';
import Styles from './digitalsubscriptionform.module.scss';
import { initializeBraintree } from '/components/common';
import { PlanCard } from '/components/cards';
import { getAllPlans } from '/api';

export function DigitalSubscriptionForm({ selectedProduct }) {
  const [allPlans, setAllPlans] = useState([]);
  const initialValues = {
    first_name: '',
    emaillast_name: '',
    email: '',
    mobile: '',
    coupon: '',
    is_trail: false,
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

  useEffect(() => {
    initializeBraintree();
  }, [selectedProduct]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllPlans(selectedProduct);
      setAllPlans(data);
    })();
  }, [selectedProduct]);

  return (
    <div className={Styles.formWrapper}>
      {allPlans.length > 0 && (
        <Formik
          initialValues={initialValues}
          initialErrors={initialErrors}
          validate={() => {}}
          onSubmit={(values) => {
            console.log(values);
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
            <form className={Styles.form}>
              <div className={Styles.plan}>
                <div className={Styles.selectPlan}>Select a Plan</div>
                <div className={Styles.plansContainer}>
                  {allPlans.map((plan, index) => (
                    <PlanCard key={index} plan={plan} />
                  ))}
                </div>
              </div>
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
                  {errors.first_name && touched.first_name && errors.first_name}
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
                  {errors.last_name && touched.last_name && errors.last_name}
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
                  {errors.email && touched.email && errors.email}
                </label>
                <label>
                  Phone Number
                  <PhoneInput
                    name="phone"
                    mask="#"
                    useNationalFormatForDefaultCountryValue={true}
                    countrySelectProps={{ unicodeFlags: false }}
                    withCountryCallingCode={false}
                    className={Styles.phoneInput}
                    onChange={(value) => {
                      values.mobile = value;
                    }}
                  />
                </label>
                <div className={Styles.paymentDetails}>Payment Details</div>
                <div
                  className={Styles.dropinContainer}
                  id="dropin-container"
                ></div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
}
