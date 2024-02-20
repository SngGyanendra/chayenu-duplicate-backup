import Styles from "./Steps.module.scss";
import Link from 'next/link';

export default function Steps() {
  return (
    <div>
      <div className={Styles.MainSection2}>
        <div className={Styles.section2}>
        <h2>Get started in 3 easy steps</h2>
          <div className={Styles.card}>
            <div className={Styles.cardContentLeft}>
              <div className={Styles.mainSteps}>
                <div className={Styles.steps}>
                  <div className={Styles.image}>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps1.svg"
                      alt="steps"
                    />
                  </div>
                  <div className={Styles.text}>
                    <h3>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps1.svg"
                      alt="steps"
                    />
                      <span>Click <a href="javascript:void(0);">HERE</a> to sign up
                      for your 30-day free trial</span>
                    </h3>
                    <p>
                      Access Chayenu instantly on our app while you wait for
                      your first issue.
                    </p>
                  </div>
                </div>
                <div className={Styles.steps}>
                  <div className={Styles.image}>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps2.svg"
                      alt="steps"
                    />
                  </div>
                  <div className={Styles.text}>
                    <h3>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps2.svg"
                      alt="steps"
                    />
                        <span>We&apos;ll send your first Chayenu right away</span>
                    </h3>
                    <p>
                      Get your first issue within a week with our speedy
                      shipping!
                    </p>
                  </div>
                </div>
                <div className={Styles.steps}>
                  <div className={Styles.image}>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps3.svg"
                      alt="steps"
                    />
                  </div>
                  <div className={Styles.text}>
                    <h3>
                    <img
                      className={Styles.img}
                      src="/images/trial/steps3.svg"
                      alt="steps"
                    />
                        <span>Enjoy learning with Chayenu weekly</span>
                    </h3>
                    <p>
                      After 30 days, the annual fee is $180/year ($3.50 per
                      week!).<br></br> Cancel anytime for a pro-rated refund on
                      the remaining subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.cardContentRight}>
              <img
                className={Styles.img}
                src="/images/trial/steps.webp"
                alt="steps"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.MainSection3}>
        <div className={Styles.section3}>
          <div className={Styles.card}>
            <h1>
              See for yourself why 30,000+ people<br></br> don’t let a day go by
              without their Chayenu.
            </h1>
            <Link href="/trial-form" className={Styles.cta}>
                START MY <strong>FREE</strong> 30-DAY TRIAL
            </Link>
            <p>
              Have questions? We’re just a friendly email away:{' '}
              <a href="mailto:info@chayenu.org" target="_blank">
                info@chayenu.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
