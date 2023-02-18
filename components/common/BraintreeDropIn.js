import dropin from 'braintree-web-drop-in';
export const initializeBraintree = (setBraintreeInstance) => {
  dropin.create(
    {
      authorization: process.env.NEXT_PUBLIC_BRAINTREE_AUTH_TOKEN || '',
      container: '#dropin-container',
    },
    
    function (_createErr, instance) {
      setBraintreeInstance(instance);
    }
  );
};
