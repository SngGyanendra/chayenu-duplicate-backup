import Styles from "./coupon.module.scss";
import { validateCoupon } from "/api";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Coupon({
  values,
  selectedPlan,
  handleChange,
  handleBlur,
  coupon,
  setCoupon,
  isTrial,
  query,
  selectedProduct,
  selectedCountry,
}) {
  const [error, setError] = useState(undefined);
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  useEffect(() => {
    values.coupon = undefined;
    setCoupon(undefined);
    if (selectedPlan?.default_coupon) {
      setIsCouponVerified(true);
      setCoupon(selectedPlan?.default_coupon);
      values.coupon = selectedPlan?.default_coupon.code;
    } else if (
      query?.code &&
      selectedProduct?.name === "Chayenu" &&
      selectedPlan?.recurring === "Yearly" &&
      selectedCountry?.name === "USA"
    ) {
      values.coupon = process.env.NEXT_PUBLIC_REFERRAL_COUPON;
    } else if (query?.code) {
      values.coupon = "";
      setCoupon(undefined);
      setIsCouponVerified(false);
    } else {
      setCoupon();
      setIsCouponVerified(false);
      values.coupon = undefined;
    }
  }, [selectedPlan]);

  const applyReferralCoupon = () => {
    const isYearlyPlan = selectedPlan?.recurring === "Yearly";
    if (query?.code && isYearlyPlan && values?.coupon) {
      (async () => {
        await verifyCoupon();
      })();
    }
  };

  useEffect(() => {
    if (
      query?.code &&
      selectedPlan &&
      selectedProduct?.name === "Chayenu" &&
      selectedCountry.name === "USA" &&
      selectedPlan?.recurring === "Yearly"
    ) {
      values.coupon = process.env.NEXT_PUBLIC_REFERRAL_COUPON;
      applyReferralCoupon();
    } else if (selectedCountry == "others") {
      console.log("WHY NOT HERE");
      values.coupon = "";
      setCoupon(undefined);
      setIsCouponVerified(false);
    }
  }, [query?.code, selectedPlan, selectedCountry]);

  const verifyCoupon = async () => {
    setError(undefined);
    if (values?.coupon === undefined) {
      return;
    }
    const couponFilter = {
      _and: [
        { code: { _icontains: values?.coupon } },
        { plans: { plans_id: { _eq: selectedPlan?.id?.toString() } } },
        { status: { _neq: "archived" } },
      ],
    };
    try {
      const { data } = await validateCoupon(couponFilter);
      if (!data.length) throw Error("Invalid coupon");

      const coupon = data.find(
        (c) => c.code.toLowerCase() === values?.coupon.toLowerCase()
      );
      if (!coupon) throw Error("Invalid coupon");

      if (coupon.is_used) throw Error("Coupon already used");
      const currentDate = Date.now();
      if (new Date(coupon.expiry_date).getTime() < currentDate)
        throw Error("Coupon has expired");
      setIsCouponVerified(true);
      setCoupon(coupon);
      values.coupon = coupon.code;
    } catch (err) {
      values.coupon = undefined;
      setCoupon(undefined);
      setError(err.message);
    }
  };
  return (
    <>
      {!isTrial && (
        <label className={Styles.couponLabel}>
          {!isCouponVerified ? (
            <div className={Styles.coupon}>
              <input
                type="text"
                name="coupon"
                placeholder="Coupon"
                value={values.coupon}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                onClick={verifyCoupon}
                title="The buttons"
                className={Styles.apply}
              >
                Apply
              </div>
            </div>
          ) : (
            <div className={Styles.couponVerified}>
              <span>
                {coupon?.amount_type?.toLowerCase() === "percentage"
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
                <Image
                  src="/trash.svg"
                  alt="delet icon"
                  height={20}
                  width={20}
                />
              </span>
            </div>
          )}
          <div className={Styles.error}>{error}</div>
        </label>
      )}
    </>
  );
}
