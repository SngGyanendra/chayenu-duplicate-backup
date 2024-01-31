import Styles from "./About.module.scss";
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <div className={Styles.about}>
        <h2 className={Styles.headline}>
          In Their Own Words…
        </h2>
      <div className={Styles.aboutBox}>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/trialabout1.svg" alt="box" />
              <p>
              “A remarkable treasure providing us with just <span>the perfect balance of spiritual nutrients</span> on a daily and weekly basis.”
              </p>
              <i>Moshe Zalman Olive, Israel</i>
          </div>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/trialabout2.svg" alt="box" />
              <p>
              “A life-saver. <span>The clarity is absolutely amazing</span>. I don’t think there’s anything like it on the market.”
              </p>
              <i>Meyer Sarfati</i>
          </div>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/trialabout3.svg" alt="box" />
              <p>
              “Absolutely incredible publication.<br></br><span> Worth its weight in gold.</span>”
              </p>
              <i>Chavi Epstein, Columbia, SC</i>
          </div>
      </div>
      </div>
      <div className={Styles.MainSection2}>
        <div className={Styles.section2}>
          <div className={Styles.card}>
            <div className={Styles.cardContentLeft}>
              <div className={Styles.box}>
                <div>
                  <h2>Your spiritual anchor— right where you need it</h2>
                  <p>
                    Elevate your Torah study effortlessly with curated teachings delivered to your doorstep each week. <strong>Whether you have 3 minutes or 3 hours</strong>, we fit seamlessly into your schedule.
                  </p>
                </div>
                <img
                  className={Styles.img}
                  src="/images/trial/section2.webp"
                  alt="Books"
                />
              </div>
              <Link href="/trial-form" className={Styles.cta}>
                  YES. I WANT MY <strong>FREE</strong> 30-DAY ACCESS NOW!
              </Link>
            </div>
            <div className={Styles.cardContentRight}>
              {/* <Link href="/pdfs/Chayenu-Sample.pdf" target="_blank">
                <button>VIEW SAMPLE</button>
              </Link> */}
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
