import Styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cardContentLeft}>
          <h1 className={Styles.title}>Chayenu 1 Month Trial</h1>
          <ul className={Styles.featureList}>
            <li>Print & digital access.</li>
            <li>USA Only.</li>
            <li>Cancel anytime.</li>
            <li>Delivery within a week.</li>
          </ul>
          <div className={Styles.cardMobileImage}></div>
          <a href="#payment-section" className={Styles.cta}>
            Start Free Trial
          </a>
        </div>

        <div className={Styles.cardContentRight}>
          <img
            className={Styles.img}
            src="/images/homepage/ChayenuHomeTopRight.webp"
            alt="Books"
          />
        </div>
      </div>
    </div>
  );
}
