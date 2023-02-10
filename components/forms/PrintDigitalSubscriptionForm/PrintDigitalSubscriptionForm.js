import Styles from './printdigitalsubscriptionform.module.scss';

export default function Printdigitalsubscriptionform() {
  const initialValues = {
    first_name: '',
    last_name: '',
    organization: '',
    address_1: '',
    address_2: '',
    zip_code: '',
    email: '',
    mobile: '',
    coupon: '',
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
  return <div>printdigitalsubscriptionform</div>;
}
