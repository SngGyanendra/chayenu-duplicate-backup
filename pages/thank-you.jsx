import { useSelector } from 'react-redux';
import Styles from '../styles/thankyou.module.scss';
import Link from 'next/link';

export default function ThankYou({ product_name }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  return (
    <div className={Styles.page}>
      <div className={Styles.thankYou}>
        Thank you for subscribing to {product_name}!
      </div>
      {isLoggedIn ? (
        <div className={Styles.message}>
          <Link href="/portal/my-subscriptions">
            <b>Click here</b>
          </Link>{' '}
          to view and manage your subscription.
        </div>
      ) : (
        <div className={Styles.message}>
          We&apos;ve sent a password to your email address.{' '}
          <Link href="/login">
            <b>Click here</b>
          </Link>{' '}
          to access your account.
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { product_name } = ctx.query;
  console.log(product_name);

  if (!product_name) {
    return {
      redirect: {
        destination: '/subscribe',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product_name,
    },
  };
}
