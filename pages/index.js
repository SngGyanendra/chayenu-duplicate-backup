import { useState, useEffect, useRef } from 'react';
import ContainerCard from '../components/cards/ContainerCard/ContainerCard';
import Styles from '../styles/home.module.scss';
import { NextHead } from '/components/common';
import Image from 'next/image';
import { Popup } from '../components/common';
import GOTBookImage from '/public/images/homepage/GOT@2x.png';
import GOTMobileImage1 from '/public/images/homepage/GOTM1@2x.png';
import GOTMobileImage2 from '/public/images/homepage/GOTM2@2x.png';
import TalmudM1 from '/public/images/homepage/TalmudM1.png';
import TalmudM2 from '/public/images/homepage/TalmudM2.png';
import TalmudM3 from '/public/images/homepage/TalmudM3.png';
import Chayus from '/public/images/homepage/Chayus.png';
import Chitas from '/public/images/homepage/Chitas.png';
import SteinsaltzLogo from '/public/images/homepage/SteinsaltzLogo.png';
import Section5Mobile from '/public/images/homepage/Section5Mobile.png';
import Link  from 'next/link';
import { testimonials1, testimonials2 } from '../data/testimonials';
import Testimonials from '../components/Testimonials/Testimonials';
import ChayenuMobileApp from '../components/ChayenuMobileApp/ChayenuMobileApp';
import { NewsLetter } from '/components/forms';


export default function Home() {
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  
  return (
    <main>
      <NextHead title="Chayenu" />

      <section className={Styles.main}>
        <ContainerCard propClasses={Styles.section1}>
          <div className={Styles.card}>
            <div className={Styles.cardContentLeft}>
              <h1>Daily Torah Study</h1>
              <h3>More Accesible Than Ever! </h3>
              <div className={Styles.cardMobileImage}></div>
              <button type="button">SUBSCRIBE</button>
            </div>
            <div className={Styles.cardContentRight}></div>
          </div>
        </ContainerCard>

        <ContainerCard propClasses={Styles.section2}>
          <div className={Styles.card}>
            <div className={Styles.cardContentLeft}>
              <h2>Establish Your Daily Torah</h2>
              <h2>Study Routine</h2>
              <ul>
                <li> Print & digital Torah publication in Hebrew & English </li>
                <li>
                  {' '}
                  Daily study cycles; Chumash, Rambam, Tanya & much more{' '}
                </li>
                <li> Studied in over 20,000 people in 35 countries </li>
                <li>
                  {' '}
                  Take the guess work out of establishing a daily study routine{' '}
                </li>
                <li> Shipped to you - 52 editions a year </li>
              </ul>
            </div>
            <div className={Styles.cardContentRight}>
              <Link href="/pdfs/Chayenu-Sample.pdf" target="_blank">
                <button>VIEW SAMPLE</button>
              </Link>
            </div>
          </div>
          
          {testimonials1 && testimonials1.length && <Testimonials listOfTestimonials={testimonials1}/>}
        </ContainerCard>

        <ContainerCard propClasses={Styles.section3}>
          <ChayenuMobileApp Styles={Styles}/>

          {testimonials1 && testimonials1.length && <Testimonials listOfTestimonials={testimonials2}/>}

        </ContainerCard>

        <ContainerCard propClasses={Styles.section4}>
          <div className={Styles.card}>
            <div className={Styles.column1}>
              <h2>Gate of Trust</h2>
              <p className={Styles.note}>
                An Ancient Yet Relevant Manual, For Navigating Life With
                Positivity, Poise, And Purpose.
              </p>
              <p>In the Chayenu app or in book form</p>
              <p>BUY THE BOOK</p>
            </div>

            <div>
              <Image src={GOTBookImage} alt="" width={222} height={322} />
            </div>

            <div>
              <Image src={GOTMobileImage1} alt="" width={152} height={300} />
            </div>

            <div>
              <Image src={GOTMobileImage2} alt="" width={152} height={300} />
            </div>

            <div className={Styles.mbuy}>
              <p>With Commentary Woven From Classical And Chassdic Sources</p>
              <p>BUY THE BOOK</p>
            </div>
          </div>

        </ContainerCard>

        <ContainerCard propClasses={Styles.section5}>
          <div className={Styles.card}>
            <div className={Styles.column1}>
              <h2>Steinsaltz Talmud</h2>
              <p>The Talmud At Your Fingertips</p>
              <span>Chayenu App</span>
              <Image src={SteinsaltzLogo} alt="" width={60} height={60} />
              <span>Commentary by</span>
              <span>Rabbi Adin Even-Israel (Steinsaltz) OBM</span>
            </div>

            <div>
              <Image src={TalmudM1} alt="" width={152} height={300} />
            </div>

            <div>
              <Image src={TalmudM2} alt="" width={152} height={300} />
            </div>

            <div>
              <Image src={TalmudM3} alt="" width={152} height={300} />
            </div>

            <div className={Styles.mtalmud}>
              <Image src={Section5Mobile} alt="" width={343} height={325} />
            </div>
          </div>
                
        </ContainerCard>

        <ContainerCard propClasses={Styles.section6}>
          <div className={Styles.card}>
            <div>
              <h2>Chayus</h2>
              <p>
                Free weekly Torah digest. Curated snippets of great Torah
                content, in your inbox
              </p>
              <Image src={Chayus} alt="" width={338} height={270} />
              <p className={Styles.sample}>Sample | Browse Archive</p>
              <button>SUBSCRIBE TO CHAYUS</button>
            </div>

            <div className={Styles.verticalBar}></div>

            <div>
              <h2>Chitas.org</h2>
              <p>
                Join the movement to study Chitas daily, and in turn, receive
                and retain blessings from Hashem.
              </p>
              <p className={Styles.sample}>COMING SOON</p>
              <Image src={Chitas} alt="" width={225} height={293} />
            </div>
          </div>

        </ContainerCard>

        <ContainerCard propClasses={Styles.section7}>
          <div className={Styles.card}>
            <div>
              <h2>Newsletter</h2>
              <p>
                Signup to our newsletter to be in the loop about anything
                Chayenu related
              </p>
              <button onClick={() => setOpenSignUpForm(true)}>SIGNUP</button>
            </div>

            <div>
              <h2>WhatsApp</h2>
              <p>
                Join our WhatsApp list to receive a daily summary of Chumash,
                Tanya & Rambam
              </p>

              <Link
                href="https://api.whatsapp.com/send/?phone=17184503277&text&type=phone_number&app_absent=0"
                target="_blank"
              >
                <button>JOIN</button>
              </Link>
            </div>

            <div>
              <h2>Sheimos</h2>
              <p>
                We will send you a box so you can return Chayenus for proper
                disposal
              </p>

              <Link
                href="https://chayenu.org/product/shaimos-box/"
                target="_blank"
              >
                <button>BUY</button>
              </Link>
            </div>
          </div>

        </ContainerCard>
      </section>
     
      {
        openSignUpForm && <Popup setPopupState={setOpenSignUpForm}>
          <NewsLetter setPopupState={setOpenSignUpForm}/>
        </Popup>
      }
    </main>
  );
}
