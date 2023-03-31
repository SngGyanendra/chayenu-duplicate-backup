import { Formik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { getAllCountries } from '/api';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { updatePaymentMethods } from '/store/userSlice';
import toast from 'react-hot-toast';
import { toastTemplate } from '/components/common';
import { updateCountries } from '/store/userSlice';
import { AuthencticatedUserAPI } from '/api/authenticateRequests';
import { CreditCardInput } from '/components/forms';
import Styles from './addpaymentmethod.module.scss';

export function AddPaymentMethod({ setEditingState }) {
  const APIs = new AuthencticatedUserAPI();
  const dispatch = useDispatch();
  const { countries: countriesList } = useSelector((state) => state.user);

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [cardNonce, setCardNonce] = useState();
  const [cardErrors, setCardErrors] = useState({
    cvv: undefined,
    number: undefined,
    expiry: undefined,
  });

  const creditCardForm = useRef();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllCountries();
      setCountries(data);
      dispatch(updateCountries(data));
    };
    if (countriesList.length === 0) {
      getData();
    } else {
      setCountries(countriesList);
    }
  }, [countriesList]);

  const initialValues = {
    address_1: undefined,
    zip_code: undefined,
    city: undefined,
    country: undefined,
    state: undefined,
  };

  const initialErrors = {
    address_1: undefined,
    zip_code: undefined,
    city: undefined,
    country: undefined,
    state: undefined,
  };

  const validationSchema = Yup.object().shape({
    address_1: Yup.string().required('Billing address is required'),
    city: Yup.string().required('City is required'),
    country: Yup.number().required('country is required'),
    state: Yup.number().when({
      is: () => selectedCountry?.states?.length > 0,
      then: () => Yup.number().required('state is required'),
    }),
    zip_code: Yup.string().required('zip code is required'),
  });

  return (
    <div className={Styles.paymentMethod}>
      <CreditCardInput
        setCardNonce={setCardNonce}
        creditCardForm={creditCardForm}
        setCardErrors={setCardErrors}
      />
      <Formik
        initialValues={initialValues}
        initialErrors={initialErrors}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          creditCardForm.current.dispatchEvent(new Event('submit'));
          const loadingToast = toastTemplate(
            toast.loading,
            'Add payment method'
          );
          try {
            setLoading(true);
            // const response = await APIs.updatePaymentMethod(newValues);
            setLoading(false);
            toastTemplate(
              toast.success,
              'Payment added successfully',
              loadingToast
            );
            setEditingState(false);
            // const newPaymentMethods = await APIs.getAllPaymentMethods();
            // dispatch(updatePaymentMethods(newPaymentMethods));
          } catch (error) {
            toastTemplate(
              toast.error,
              'Unable to add payment method',
              loadingToast
            );
            setLoading(false);
          }
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className={Styles.cardDetails} onSubmit={handleSubmit}>
            <div className={Styles.cardAddress}>
              <div className={`${Styles.address} ${Styles.cardAddressDetail}`}>
                <label htmlFor="address_1">Billing Address:</label>
                <input
                  type="text"
                  name="address_1"
                  id="address_1"
                  placeholder="Address"
                  value={values.address_1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className={Styles.error}>
                  {errors.address_1 && touched.address_1 && errors.address_1}
                </span>
              </div>
              <div className={Styles.cardAddressDetail}>
                City:
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className={Styles.error}>
                  {errors.city && touched.city && errors.city}
                </span>
              </div>
              <div className={Styles.cardAddressDetail}>
                State/Region:
                <>
                  <select
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    disabled={!selectedCountry?.states?.length}
                    onBlur={handleBlur}
                    className={`${!values.state ? Styles.defaultOption : ''}`}
                  >
                    <option
                      value="state"
                      disabled={true}
                      selected={true}
                      hidden={true}
                    >
                      State
                    </option>
                    {selectedCountry?.states?.map((country) => (
                      <option value={country.id} key={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <span className={Styles.error}>
                    {errors.state && touched.state && errors.state}
                  </span>
                </>
              </div>
              <div className={Styles.cardAddressDetail}>
                Country:
                <select
                  name="country"
                  onChange={(e) => {
                    const country = countries.find((country) => {
                      return country.id == e.target.value;
                    });
                    values.state = undefined;
                    values.country = e.target.value;
                    setSelectedCountry(country);
                  }}
                  onBlur={handleBlur}
                  className={`${!values.country ? Styles.defaultOption : ''}`}
                  value={values.country}
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
              </div>
              <div className={Styles.cardAddressDetail}>
                Postal Code:
                <input
                  type="text"
                  name="zip_code"
                  id="zip"
                  placeholder="Zip"
                  value={values.zip_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className={Styles.error}>
                  {errors.zip_code && touched.zip_code && errors.zip_code}
                </span>
              </div>
            </div>
            <div className={Styles.buttons}>
              <div>
                <button
                  type="submit"
                  className={`${loading ? `${Styles.disabled}` : ''}`}
                >
                  {!loading ? 'SAVE' : 'SAVING...'}
                </button>
                <button onClick={() => setEditingState(false)}>CANCEL</button>
              </div>
              <div className={Styles.defaultCardId}>
                <label htmlFor="default">
                  <input
                    type="checkbox"
                    name="default"
                    id="default"
                    value={values.default}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  DEFAULT
                </label>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
