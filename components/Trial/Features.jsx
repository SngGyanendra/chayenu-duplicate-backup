import Styles from "./Features.module.scss";
import FeatureList from "./FeatureList";
import Link from 'next/link';
import { features } from "../../data/features";

export default function Features() {
  return (
  <div>
    <div className={Styles.about}>
      <div className={Styles.aboutBox}>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/feature1.svg" alt="box" />
              <h2>Perfect For All Knowledge Levels</h2>
              <p>
              Whether you’re a true beginner or an advanced scholar seeking to expand your knowledge, Chayenu has something for everyone.
              </p>
          </div>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/feature2.svg" alt="box" />
              <h2>Easy, Portable, & Convenient</h2>
              <p>
              At home? Traveling? Got a few minutes during your lunch break? Chayenu makes Torah study possible anytime, anywhere.
              </p>
          </div>
          <div className={Styles.aboutsmallBox}>
              <img src="/images/trial/feature3.svg" alt="box" />
              <h2>A Done-For-You Study System</h2>
              <p>
              No need to ask, “What should I learn today?” Chayenu eliminates the guesswork by streamlining your daily study routine.
              </p>
          </div>
      </div>
    </div>

    <div className={Styles.MainSection2}>
        <div className={Styles.section2}>
            <div className={Styles.card}>
                <h2>Ditch the guesswork:<br/> Your ideal daily dose, delivered.</h2>
                <p className={Styles.subhead}>Every edition includes all these selections, and more:</p>
                <div className={Styles.mainBox}>
                {features.map((feature,index) => {
                  return(
                  <FeatureList feature={feature} key={index} />
                  )
                })}

                <div className={Styles.links}>
                        <Link href="/trial-form" className={Styles.cta}>
                            START MY <strong>FREE</strong> 30-DAY TRIAL
                        </Link>
                        <Link href="/pdfs/Chayenu-Sample.pdf" className={Styles.cta2} target="_blank">
                            VIEW SAMPLE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
  );
}
