import Styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cardContentLeft}>
          <h1 className={Styles.title}>Your Daily Study—Simplified</h1>
          <p className={Styles.subtitle}>Sign up for a <strong>FREE 30-day trial</strong>, and join the <strong>30,000+</strong> busy individuals worldwide who’ve made Chayenu their <strong>daily Torah study companion.</strong></p>
          <a href="#payment-section" className={Styles.cta}>
            YES. I WANT MY <strong>FREE</strong> 30-DAY ACCESS NOW!
          </a>
          <ul className={Styles.featureList}>
            <li>
              <img src="/images/trial/hero1.svg" alt="hero" />
              <p>Risk-free—cancel anytime.</p>
            </li>
            <li>
              <img src="/images/trial/hero2.svg" alt="hero" />
              <p>Includes print and (instant!) digital access</p>
            </li>
            <li>
              <img src="/images/trial/hero3.svg" alt="hero" />
              <p>Available to all US residents</p>
            </li>
          </ul>
          <div className={Styles.cardMobileImage}></div>
        </div>

        <div className={Styles.cardContentRight}>
          <img
            className={Styles.img}
            src="/images/trial/trialhero.webp"
            alt="hero"
          />
        </div>
      </div>
    </div>
  );
}
