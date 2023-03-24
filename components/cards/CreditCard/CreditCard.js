import Image from 'next/image';
import Styles from './creditcard.module.scss';

export function CreditCard({ paymentMethod }) {
  function getCardImage(cardName) {
    switch (cardName) {
      case 'Visa':
        return (
          <Image src="/cards/Visa.svg" alt="Visa" height={30} width={70} />
        );

      case 'American Express':
        return (
          <Image
            src="/cards/AmericanExpress.svg"
            alt="Visa"
            height={30}
            width={70}
          />
        );
      case 'MasterCard':
        return (
          <Image
            src="/cards/mastercard.svg"
            alt="Visa"
            height={30}
            width={40}
          />
        );
      case 'Discover':
        return (
          <Image src="/cards/Discover.svg" alt="Visa" height={30} width={70} />
        );
      case 'JCB':
        return (
          <Image src="/cards/JCB.svg" alt="Visa" height={30} width={30} />
        );
    }
    
  }

  return (
    <div className={Styles.creditCard}>
      <div className={Styles.cardNumberandType}>
        {getCardImage(paymentMethod?.cardType)}
        <div>{`**** **** **** ${paymentMethod.number.slice(-4)}`}</div>
      </div>
      <div>
        <span className={Styles.expiryDate}>Exp.</span>
        {paymentMethod.expirationDate}
      </div>
    </div>
  );
}
