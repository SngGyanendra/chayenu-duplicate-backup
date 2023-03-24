import { Formik } from 'formik';
import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '/store/userSlice';
import * as Yup from 'yup';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import Styles from './editprofile.module.scss';

export function EditProfile({ userProfile, setPopupState }) {
  const APIs = new AuthencticatedUserAPI();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    first_name: userProfile?.first_name,
    last_name: userProfile?.last_name,
    mobile: userProfile?.mobile,
  };

  const initialErrors = {
    first_name: '',
    last_name: '',
    mobile: '',
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
    mobile: Yup.string()
      .required('Phone is required')
      .test('phone is valid', 'Invalid contact', (value) => {
        if (value) {
          return isValidPhoneNumber(value);
        } else {
          return false;
        }
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          setLoading(true);
          const { data } = await APIs.updateUserProfile(values);
          dispatch(updateUserDetails(data));
          setLoading(false);
          setPopupState(undefined);
          localStorage.setItem('first_name', data?.first_name);
          localStorage.setItem('last_name', data?.last_name);
        } catch (error) {
          setLoading(false);
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
          <div>Update Profile</div>
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.first_name && touched.first_name && errors.first_name}
          </span>
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.last_name && touched.last_name && errors.last_name}
          </span>
          <PhoneInput
            name="mobile"
            mask="#"
            countrySelectProps={{ unicodeFlags: false }}
            withCountryCallingCode={false}
            placeholder="Phone"
            className={Styles.phoneInput}
            value={values.mobile}
            onChange={(e) => {
              values.mobile = e;
            }}
            onBlur={handleBlur}
          />
          <span className={Styles.error}>
            {errors.mobile && touched.mobile && errors.mobile}
          </span>
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? `${Styles.disabled}` : ''}`}
          >
            {!loading ? 'Submit' : 'Updating...'}
          </button>
        </form>
      )}
    </Formik>
  );
}
