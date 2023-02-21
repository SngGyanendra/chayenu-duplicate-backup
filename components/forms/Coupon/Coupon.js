import Styles from './coupon.module.scss';
import { validateCoupon } from '/api';
import { useState } from 'react';
import Image from 'next/image';

export function Coupon({
  values,
  selectedPlan,
  handleChange,
  handleBlur,
  coupon,
  setCoupon,
}) {
  const [error, setError] = useState(undefined);
  const [isCouponVerified, setIsCouponVerified] = useState(false);

  const verifyCoupon = async () => {
    setError(undefined);
    if (values?.coupon === undefined) {
      return;
    }
    const couponFilter = {
      _and: [
        { code: { _eq: values?.coupon } },
        { plans: { plans_id: { _eq: selectedPlan?.id?.toString() } } },
        { status: { _neq: 'archived' } },
      ],
    };
    try {
      const { data } = await validateCoupon(couponFilter);
      if (!data.length) throw Error('Invalid coupon');
      if (data[0].is_used) throw Error('Coupon already used');
      const currentDate = Date.now();
      if (new Date(data[0].expiry_date).getTime() < currentDate)
        throw Error('Coupon has expired');
      setIsCouponVerified(true);
      setCoupon(data[0]);
      values.coupon = data[0].code;
    } catch (err) {
      values.coupon = undefined;
      setCoupon(undefined);
      setError(err.message);
    }
  };
  return (
    <>
      <label className={Styles.couponLabel}>
        Coupon
        {!isCouponVerified ? (
          <div className={Styles.coupon}>
            <input
              type="text"
              name="coupon"
              value={values.coupon}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={Styles.apply} onClick={verifyCoupon}>
              Apply
            </div>
          </div>
        ) : (
          <div className={Styles.couponVerified}>
            <span>
              {coupon?.amount_type.toLowerCase() === 'percentage'
                ? `${coupon?.amount}% COUPON APPLIED`
                : `$${coupon?.amount} COUPON APPLIED`}
            </span>
            <span
              onClick={() => {
                setCoupon(undefined);
                values.coupon = undefined;
                setIsCouponVerified(false);
              }}
            >
              <Image src="/trash.svg" alt="delet icon" height={28} width={28} />
            </span>
          </div>
        )}
        <div className={Styles.error}>{error}</div>
      </label>
    </>
  );
}
