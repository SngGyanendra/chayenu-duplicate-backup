import ContainerCard from '../components/cards/ContainerCard/ContainerCard';
import Styles from '../styles/home.module.scss';
import Image from 'next/image';
import ChayenuAppImage from '/public/images/homepage/ChayenuBlue.png';
import GOTBookImage from '/public/images/homepage/GOT@2x.png';
import GOTMobileImage1 from '/public/images/homepage/GOTM1@2x.png';
import GOTMobileImage2 from '/public/images/homepage/GOTM2@2x.png';
import TalmudM1 from '/public/images/homepage/TalmudM1.png';
import TalmudM2 from '/public/images/homepage/TalmudM2.png';
import TalmudM3 from '/public/images/homepage/TalmudM3.png';

export default function Home() {
  return (
    <main>
        
        <section className={Styles.main}>
            <ContainerCard propClasses={Styles.section1}>
                <div className={Styles.card}>
                    <div className={Styles.cardContentLeft}>
                        <h1>Daily Torah Study</h1>
                        <h3>More Accesible Than Ever! </h3>
                        <button type="button">Subscribe</button>
                    </div>
                    <div className={Styles.cardContentRight}>

                    </div>
                </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section2}>
            <div className={Styles.card}>
                    <div className={Styles.cardContentLeft}>
                        <h2>Establish Your Daily Torah</h2>
                        <h2>Study Routine</h2>
                        <ul>
                            <li> Print & digital Torah publication in Hebrew & English </li>
                            <li> Daily study cycles; Chumash, Rambam, Tanya & much more  </li>
                            <li> Studied in over 20,000 people in 35 countries </li>
                            <li> Take the guess work out of establishing a daily study routine </li>
                            <li> Shipped to you - 52 editions a year </li>
                        </ul>
                    </div>
                    <div className={Styles.cardContentRight}>
                        <button>View Sample</button>
                    </div>
                </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section3}>

              <div className={Styles.card}>
              
              <div className={Styles.head}>
                  <h2>Chayenu App</h2>
              </div>

                   <div className={Styles.cardContentLeft}>
                            <div>
                              <p className={Styles.subtitle}>DAILY STUDY</p>
                              
                              <div className={Styles.childCard}>
                              {
                                [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10].map((data)=>(
                                  <div className={Styles.dailyStudyCards} key={data}>
                                    {data}
                                  </div>))
                              }
                              </div>

                            </div>
                            <div>
                              <p className={Styles.subtitle}>Weekly STUDY</p>
                              <div>                              
                                <div className={Styles.childCard}>
                                {
                                  [1, 2, 3, 4, 5, 6 ,7, , 9, 10, 11, 12, 13, 14].map((data)=>(<div className={Styles.dailyStudyCards} key={data}>{data}</div>))
                                }
                                </div>

                            </div>
                            </div>
                       
                    </div>
                    
                    <div className={Styles.cardContentRight}>
                        <Image src={ChayenuAppImage} alt="Chayenu Mobile" height={550} width={260} objectFit="contain"/>
                    </div>
                </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section4}>
                                
                  <div className={Styles.card}>
                    <div>
                        <h2>Gate of Trust</h2>
                        <p>An Ancient Yet Relevant Manual, For Navigating Life With Positivity, Poise, And Purpose.</p>
                        <span>In the Chayenu app or in book form</span>
                        <span>BUY THE BOOK</span>
                    </div>
                    
                    <div>
                                <Image src={GOTBookImage} alt="" width={295} height={429}/>
                    </div>
                    
                    <div>
                                <Image src={GOTMobileImage1} alt="" width={203} height={429}/>
                    </div>
                    
                    <div>
                                <Image src={GOTMobileImage2} alt="" width={203} height={429}/>
                    </div>
                  
                  </div>                

            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section5}>
              <div className={Styles.card}>
                    <div>
                        <h2>Steinsaltz Talmud</h2>
                        <p>The Talmud At Your Fingertips</p>
                        <span>The Talmud At Your Fingertips</span>
                        <span>Commentary by</span>
                        <span>Rabbi Adin Even-Israel (Steinsaltz) OBM</span>
                    </div>
                    
                    <div>
                                <Image src={TalmudM1} alt="" width={295} height={429}/>
                    </div>
                    
                    <div>
                                <Image src={TalmudM2} alt="" width={203} height={429}/>
                    </div>
                    
                    <div>
                                <Image src={TalmudM3} alt="" width={203} height={429}/>
                    </div>
              </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section6}>
              <div className={Styles.card}>
                <div>
                      
                      <h2>Chayus</h2>
                      <p>Free weekly Torah digest. Curated snippets of great Torah content, in your inbox</p>
                      <p>image</p>
                      <p>Sample | Browse Archive</p>
                      <button>SUBSCRIBE TO CHAYUS</button>

                </div>

                <div>
                      <h2>Chitas.org</h2>
                      <p>Join the movement to study Chitas daily, and in turn, receive and retain blessings from Hashem.</p>
                      <p>COMING SOON</p>
                      <p>image</p>
                </div>
              </div>
            </ContainerCard>



            <ContainerCard propClasses={Styles.section7}>
              <div className={Styles.card}>
                <div>
                      
                      <h2>Newsletter</h2>
                      <p>Signup to our newsletter to be in the loop about anything Chayenu related</p>
                      <button>SIGNUP</button>

                </div>

                <div>
                      <h2>WhatsApp</h2>
                      <p>Join our WhatsApp list to receive a daily summary of Chumash, Tanya & Rambam</p>
                      <button>JOIN</button>
                </div>

                
                <div>
                      <h2>Sheimos</h2>
                      <p>We will send you a box so you can return Chayenus for proper disposal</p>
                      <button>BUY</button>

                </div>
              </div>
            </ContainerCard>

        </section>
    
    </main>
  );
}
