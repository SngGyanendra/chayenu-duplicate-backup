export const validateCreditCard = (state, setCardErrors) => {
  const isValid = { cvv: true, number: true, expirationDate: true };
  const fields = state?.fields;
  if (
    !(
      fields.cvv.isValid &&
      !fields.cvv.isEmpty &&
      fields.cvv.isPotentiallyValid
    )
  ) {
    isValid.cvv = false;
    setCardErrors((previousState) => {
      return { ...previousState, cvv: 'invalid cvv' };
    });
  }
  if (
    !(
      fields.number.isValid &&
      !fields.number.isEmpty &&
      fields.number.isPotentiallyValid
    )
  ) {
    isValid.number = false;
    setCardErrors((previousState) => {
      return { ...previousState, number: 'invalid credit card number' };
    });
  }
  if (
    !(
      fields.expirationDate.isValid &&
      !fields.expirationDate.isEmpty &&
      fields.expirationDate.isPotentiallyValid
    )
  ) {
    isValid.expirationDate = false;
    setCardErrors((previousState) => {
      return { ...previousState, expiry: 'invalid expiry' };
    });
  }
  if (isValid.cvv && isValid.expirationDate && isValid.number) {
    setCardErrors({ cvv: '', expiry: '', number: '' });
    return true;
  } else {
    return false;
  }
};
