import Styles from './updateshippinginfo.module.scss';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateSubscriptions } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { getAllCountries } from '/api';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';

export function UpdateShippingInfo({ subscription, setPopupState }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [states, setStates] = useState([]);

  const { countries: countriesList } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const APIs = new AuthencticatedUserAPI();

  useEffect(() => {
    const stateList = [...(selectedCountry?.states || [])];
    setStates(stateList);
  }, [selectedCountry]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCountries();
      setCountries(data);
    };
    if (countriesList.length === 0) {
      getData();
    } else {
      setCountries(countriesList);
    }
  }, []);

  useEffect(() => {
    if (subscription?.country) {
      const country = countries.find(
        (country) => country.id === subscription?.country
      );
      setSelectedCountry(country);
    }
  }, [countries]);

  const initialValues = {
    first_name: subscription?.first_name,
    last_name: subscription?.last_name,
    address_1: subscription?.address_1,
    address_2: subscription?.address_2,
    zip_code: subscription?.zip_code,
    city: subscription?.city,
    country: subscription?.country,
    state: subscription?.state,
  };
  const initialErrors = {
    first_name: undefined,
    last_name: undefined,
    address_1: undefined,
    address_2: undefined,
    zip_code: undefined,
    city: undefined,
    country: undefined,
    state: undefined,
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
    address_1: Yup.string().trim().required('Address is required'),
    address_2: Yup.string().trim().nullable(),
    city: Yup.string().trim().required('City is required'),
    state: Yup.number().when({
      is: () => selectedCountry?.states.length > 0,
      then: () => Yup.number().required('state is required'),
    }),
    zip_code: Yup.string().trim().required('Zip is required'),
  });

  const updateAddress = async (values) => {
    const finalValues = {
      id: subscription.id,
      billing_address: {
        first_name: values.first_name,
        last_name: values.last_name,
        address_1: values.address_1,
        address_2: values.address_2,
        city: values.city,
        country: selectedCountry?.id,
        ...(values.state && { state: parseInt(values.state) }),
        zip_code: values.zip_code,
      },
    };
    const loadingToast = toastTemplate(toast.loading, 'Updating...');
    try {
      const response = await APIs.updateAddress(finalValues);
      toastTemplate(toast.success, 'Info updated successfully', loadingToast);
      const subscriptions = await APIs.getAllUserSubscriptions();
      dispatch(updateSubscriptions(subscriptions));
      setPopupState(undefined);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastTemplate(toast.error, 'Failed to update the info', loadingToast);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      initialErrors={initialErrors}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true);
        await updateAddress(values);
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
        <form className={Styles.form} onSubmit={handleSubmit}>
          <div>Update Shipping Info</div>
          <div className={Styles.transferData}>
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
            <input
              type="text"
              name="address_1"
              placeholder="Address line 1"
              value={values.address_1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className={Styles.error}>
              {errors.address_1 && touched.address_1 && errors.address_1}
            </span>
            <input
              type="text"
              name="address_2"
              placeholder="Address line 2"
              value={values.address_2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className={Styles.error}>
              {errors.address_2 && touched.address_2 && errors.address_2}
            </span>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className={Styles.error}>
              {errors.city && touched.city && errors.city}
            </span>
            <select
              name="country"
              onChange={(e) => {
                const country = countries.find((country) => {
                  return country.id == e.target.value;
                });
                setSelectedCountry(country);
                values.state = undefined;
                values.country = e.target.value;
              }}
              onBlur={handleBlur}
              className={`${!values.country ? Styles.defaultOption : ''}`}
              defaultValue="country"
              value={values.country}
              disabled
            >
              <option value="country" disabled={true} hidden={true}>
                Country
              </option>
              {countries.map((country) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            <span className={Styles.error}>
              {errors.country && touched.country && errors.country}
            </span>
            {selectedCountry?.states?.length > 0 && (
              <>
                <select
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${!values.state ? Styles.defaultOption : ''}`}
                  defaultValue="state"
                >
                  <option value="state" disabled={true} hidden={true}>
                    State
                  </option>
                  {states
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((country) => (
                      <option value={country.id} key={country.id}>
                        {country.name}
                      </option>
                    ))}
                </select>
                <span className={Styles.error}>
                  {errors.state && touched.state && errors.state}
                </span>
              </>
            )}

            <input
              type="text"
              name="zip_code"
              placeholder="Zip"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zip_code}
            />
            <span className={Styles.error}>
              {errors.zip_code && touched.zip_code && errors.zip_code}
            </span>
            <button
              type="submit"
              disabled={loading}
              className={`${loading ? `${Styles.disabled}` : ''}`}
            >
              {!loading ? 'Change' : 'Changing...'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
