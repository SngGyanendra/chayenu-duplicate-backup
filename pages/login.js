import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { login } from '/api';
import { saveAuthData } from '/util';
import Styles from '/styles/login.module.scss';

export default function Login() {
  const [error, setError] = useState('');

  const initialValues = { email: undefined, password: undefined };
  const initialErrors = { email: undefined, password: undefined };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Enter valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginText}>Login into Your Account</div>
      <Formik
        initialValues={initialValues}
        initialErrors={initialErrors}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setError('');
            const data = await login(values);
            saveAuthData(data);
          } catch (error) {
            if (error?.response?.status === 401) {
              setError('Invalid credentials entered');
            } else {
              setError('A error occured');
            }
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
        }) => (
          <form className={Styles.loginInput} onSubmit={handleSubmit}>
            <label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className={Styles.error}>
                {errors.email && touched.email && errors.email}
              </span>
            </label>
            <label>
              <input
                type="password"
                placeholder="Passsword"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className={Styles.error}>
                {errors.password && touched.password && errors.password}
              </span>
            </label>
            <input type="submit" value="LOGIN" />
            {error && <span className={Styles.error}>{error}</span>}
            <div className={Styles.forgotPassword}>Forgot Your Password?</div>
          </form>
        )}
      </Formik>
    </div>
  );
}