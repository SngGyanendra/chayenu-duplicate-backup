import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Styles from './changepassword.module.scss';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';

export function ChangePassword({ setPopupState }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const APIs = new AuthencticatedUserAPI();

  const initialValues = {
    previousPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const initialErrors = {
    previousPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    previousPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('New Password is Required')
      .min(8, 'New Password is too short - should be 8 chars minimum.')
      .matches(/(?=.*[0-9])/, 'New Password must contain a number.'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "Passwords don't match")
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const loadingToast = toastTemplate(toast.loading, 'Updating password');
        try {
          setLoading(true);
          setError();
          const response = await APIs.updatePassword(values);
          setLoading(false);
          setPopupState(false);
          toastTemplate(
            toast.success,
            'Password changed successfully',
            loadingToast
          );
        } catch (error) {
          toastTemplate(
            toast.error,
            'Password updation failed',
            loadingToast
          );
          setLoading(false);
          if (error.response) {
            if (error?.response?.status === 401) {
              setError('incorrect previous password');
            }
          } else {
            setError('A error occured,password unchanged');
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
        isSubmitting,
      }) => (
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div>New Password</div>
          <input
            type="password"
            name="previousPassword"
            placeholder="Old Password"
            value={values.previousPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.previousPassword &&
              touched.previousPassword &&
              errors.previousPassword}
          </span>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.newPassword && touched.newPassword && errors.newPassword}
          </span>
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm new Password"
            value={values.confirmNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.confirmNewPassword &&
              touched.confirmNewPassword &&
              errors.confirmNewPassword}
          </span>
          {error && <span className={Styles.error}>{error}</span>}
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? `${Styles.disabled}` : ''}`}
          >
            {!loading ? 'Submit' : 'Changing...'}
          </button>
        </form>
      )}
    </Formik>
  );
}
