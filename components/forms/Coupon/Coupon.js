import Styles from './coupon.module.scss';

export function Coupon({ values, handleChange, handleBlur }) {
  return (
    <label className={Styles.couponLabel}>
      Coupon
      <div className={Styles.coupon}>
        <input
          type="text"
          name="coupon"
          value={values.coupon}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={Styles.apply}>Apply</div>
      </div>
    </label>
  );
}
