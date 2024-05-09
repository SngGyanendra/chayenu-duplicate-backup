import React from 'react';
import { Formik } from 'formik';
import Styles from '../styles/register.module.scss';
import { registerUser } from '../api/register';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';

export default function Register() {
  const initialValues = {
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    phone: undefined,
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
    phone: undefined,
    password: undefined,
    state: undefined,
    city: undefined,
    country: undefined,
    street_address: undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      onSubmit={async (values) => {
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
            address,
          };
          const response = await registerUser(body);
        } catch (error) {
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
                  name="street"
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
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
