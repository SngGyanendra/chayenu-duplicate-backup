import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Formik } from 'formik';
import Styles from '../styles/register.module.scss';
import { registerUser } from '../api/register';
import { validateCreditCard } from '../util';
import { initializeCustomBraintree } from '../components/common';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';

export default function Register() {
  const [cardErrors, setCardErrors] = useState({
    cvv: undefined,
    number: undefined,
    expiry: undefined,
  });
  const [hostedFields, setHostedFields] = useState();

  const initialValues = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    mobile: undefined,
    password: undefined,
    street_address: undefined,
    city: undefined,
    state: undefined,
    country: undefined,
  };

  const initialErrors = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    mobile: undefined,
    password: undefined,
    state: undefined,
    city: undefined,
    country: undefined,
    street_address: undefined,
  };

  useEffect(() => {
    async function getData() {
      await initializeCustomBraintree(setHostedFields);
    }
    getData();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      onSubmit={async (values) => {
        const loadingToast = toast.loading('Processing your request');
        console.log('submitted values', values);
        const address = `Street Address : ${values.street_address} \n
         City : ${values.city} \n
         State : ${values.state} \n
         Country : ${values.country}
        `;

        try {
          const body = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            mobile: values.mobile,
            city: values.city,
            state: values.state,
            country: values.country,
            street_address: values.street_address,
            address,
          };
          let cardNonce;
          if (hostedFields) {
            if (!validateCreditCard(hostedFields.getState(), setCardErrors)) {
              setLoading(false);
              return;
            }
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
          }

          const response = await registerUser({
            ...body,
            payment_method_nonce: cardNonce,
          });
          toastTemplate(toast.success, 'Registration successful', loadingToast);
        } catch (error) {
          console.log('error', error);
          toastTemplate(
            toast.error,
            'Subscription cancellation failed\n contact support for further help',
            loadingToast
          );
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
        setFieldValue,
        isSubmitting,
      }) => (
        <form className={Styles.registerForm} onSubmit={handleSubmit}>
          <div>
            <h1>Registration Form</h1>
            <div className={Styles.section}>
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
                  {errors.first_name && touched.first_name && errors.first_name}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
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
                  {errors.last_name && touched.last_name && errors.last_name}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <span className={Styles.error}>
                  {errors.email && touched.email && errors.email}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <span className={Styles.error}>
                  {errors.password && touched.password && errors.password}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
              <label>
                <input
                  type="text"
                  name="street_address"
                  placeholder="Street Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.street_address}
                />
                <span className={Styles.error}>
                  {errors.street_address &&
                    touched.street_address &&
                    errors.street_address}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
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
            </div>
            <div className={Styles.section}>
              <label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                />
                <span className={Styles.error}>
                  {errors.state && touched.state && errors.state}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
              <label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                />
                <span className={Styles.error}>
                  {errors.country && touched.country && errors.country}
                </span>
              </label>
            </div>
            <div className={Styles.section}>
              <label>
                <PhoneInput
                  className={Styles.phoneInput}
                  // country={
                  //   selectedCountry?.name
                  //     ? countryCodes[selectedCountry?.name]
                  //     : 'us'
                  // }
                  country={'us'}
                  countryCodeEditable={false}
                  placeholder={'Mobile Number'}
                  onChange={(value, country) => {
                    const countryCode = value.slice(0, country.dialCode.length);
                    const actualNumber = value.slice(country.dialCode.length);
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
            <div className={Styles.section}>
              <label>
                <span className={Styles.cardDetails}>Credit card details</span>
                <div className={Styles.creditCard}>
                  <div className={Styles.ccnumber}>
                    {/* <label for="cc-number">Credit Card Number</label> */}
                    <div id="cc-number" className={Styles.hostedFields}></div>
                    {cardErrors && (
                      <span className={Styles.error}>{cardErrors.number}</span>
                    )}
                  </div>
                  <div className={Styles.expirycvv}>
                    <div>
                      {/* <label for="cc-expiry">Expiration Date</label> */}
                      <div id="cc-expiry" className={Styles.hostedFields}></div>
                      {cardErrors && (
                        <span className={Styles.error}>
                          {cardErrors.expiry}
                        </span>
                      )}
                    </div>
                    <div>
                      {/* <label for="cc-cvv">CVV</label> */}
                      <div id="cc-cvv" className={Styles.hostedFields}></div>
                      {cardErrors && (
                        <span className={Styles.error}>{cardErrors.cvv}</span>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className={Styles.section}>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
