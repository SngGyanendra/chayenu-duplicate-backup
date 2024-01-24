import Styles from "./Features.module.scss";
import Link from 'next/link';

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
          <h2>Ditch the guesswork: Your ideal daily dose, delivered.</h2>
          <p>Every edition includes all these selections, and more:</p>
          <div className={Styles.mainBox}>

            <div className={Styles.box}>
              <p className={Styles.text}>CHUMASH WITH RASHI</p>
              <img className={Styles.image} src="/images/trial/Rashi.svg" alt="box" />
              <p className={Styles.hoverText}>The written word of G-d with classic medieval commentary, brought to life with modern, side-by-side English translation</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>TEHILLIM</p>
              <img className={Styles.image} src="/images/trial/Tehillim.svg" alt="box" />
              <p className={Styles.hoverText}>Psalms compiled by King David that inspire connection to G-d, along with context and historical background for each chapter.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>RAMBAM</p>
              <img className={Styles.image} src="/images/trial/Rambam.svg" alt="box" />
              <p className={Styles.hoverText}>The Mishneh Torah and Sefer Hamitzvos, laid out in clear and concise language and accessible manner for learners of all levels.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>TANYA</p>
              <img className={Styles.image} src="/images/trial/Tanya.svg" alt="box" />
              <p className={Styles.hoverText}>Spiritual guidance with profound relevance to modern life, and the foundational book of Chabad Chasidism</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>HAYOM YOM</p>
              <img className={Styles.image} src="/images/trial/Hayom.webp" alt="box" />
              <p className={Styles.hoverText}>Nuggets of inspiration, compiled by the Lubavitcher Rebbe, for every day of the year.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>HAFTORAH & <br></br>SHNAYIM MIKRA</p>
              <img className={Styles.image} src="/images/trial/Haftarah.svg" alt="box" />
              <p className={Styles.hoverText}>Delve into the Haftorah’s relevant and timely messages, including clear translation and inspirational commentary.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>GEULAH</p>
              <img className={Styles.image} src="/images/trial/Geulah.svg" alt="box" />
              <p className={Styles.hoverText}>Learn about Moshiach and yearn for his arrival with teachings on the Geulah from traditional Jewish sources spanning generations</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>MISHNAH</p>
              <img className={Styles.image} src="/images/trial/Mishnayos.svg" alt="box" />
              <p className={Styles.hoverText}>Learn Mishnah in Hebrew, with a phrase by phrase English translation and additional commentary to deepen your study</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>TALMUD</p>
              <img className={Styles.image} src="/images/trial/Talmud.svg" alt="box" />
              <p className={Styles.hoverText}>Navigate the sea of Talmud with side by side Hebrew (Aramaic) and English translation, plus commentary to enrich your understanding.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>HALACHA</p>
              <img className={Styles.image} src="/images/trial/Halacha.svg" alt="box" />
              <p className={Styles.hoverText}>Learn the laws that teach one how to live a life of Torah and MItzvos.</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>CHASSIDUS</p>
              <img className={Styles.image} src="/images/trial/Chassidus.svg" alt="box" />
              <p className={Styles.hoverText}>Let the teachings of Chassidus and Kabbalah vitalize your Divine service and reveal your essential connection with G-d</p>
            </div>

            <div className={Styles.box}>
              <p className={Styles.text}>CHASSIDIC STORY</p>
              <img className={Styles.image} src="/images/trial/Chassidic-Story.svg" alt="box" />
              <p className={Styles.hoverText}>Often one can learn more from a story than from study. Through stories from the Chassidic masters we get an in-depth lesson in Divine service.</p>
            </div>

            <div className={Styles.links}>
              <a href="#payment-section" className={Styles.cta}>
                  YES. I WANT MY <strong>FREE</strong> 30-DAY ACCESS NOW!
              </a>
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
