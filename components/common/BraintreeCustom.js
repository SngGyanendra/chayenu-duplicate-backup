import braintree from 'braintree-web';

export const initializeCustomBraintree = async (setHostedFields) => {
  try {
    const hostedFieldsInstance = await braintree.hostedFields.create({
      authorization: process.env.NEXT_PUBLIC_BRAINTREE_AUTH_TOKEN,
      styles: {
        input: {
          'font-size': '14px',
          'font-family': 'Brandon Grotesque',
          color: 'black',
        },
        '.valid': {
          color: '#00AC7D',
        },
        '.invalid': {
          color: '#BE1550',
        },
      },
      fields: {
        number: {
          container: '#cc-number',
          placeholder: '4111 1111 1111 1111',
        },
        cvv: {
          container: '#cc-cvv',
          placeholder: '•••',
        },
        expirationDate: {
          container: '#cc-expiry',
          placeholder: 'MM / YY',
        },
      },
    });

    setHostedFields(hostedFieldsInstance);
  } catch (error) {
    console.error('Error initializing Braintree:', error);
  }
};
