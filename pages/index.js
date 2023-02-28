import {useState} from 'react';
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
import Chayus from '/public/images/homepage/Chayus.png';
import Chitas from '/public/images/homepage/Chitas.png';
import SteinsaltzLogo from '/public/images/homepage/SteinsaltzLogo.png';

import dailyStudyData from '../data/dailyStudy.json';
import weeklyStudyData from '../data/weeklyStudy.json';


export default function Home() {

  const [selectedChumashScreen, setselectedChumashScreen] = useState(dailyStudyData.defaultUrl)

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

                <div className={Styles.card}> 

                  <p>“As a subscriber of Chayenu I am thrilled to finally have a weekly study guide. On the road traveling often and constantly on the go, Chayenu has provided me an easy way to learn. Written in English that is perfect for the beginner to the more advanced. I strongly recommend Chayenu to anyone looking for that one booklet to assist you with your personal growth in Torah Study”</p>
                  
                  <p>Alan “Shlomo” Veingrad, former NFL offensive lineman with the Green Bay Packers & Dallas Cowboys Super Bowl XXVII championship team</p>

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
                                dailyStudyData.data.map((data)=>(
                                  <div 
                                      className={Styles.dailyStudyCards} 
                                      style={{backgroundColor: data.backgroundColor}} 
                                      key={data.title}
                                      onMouseOver={()=>{setselectedChumashScreen(data.imageUrl)}}
                                      onMouseLeave={()=>{setselectedChumashScreen(dailyStudyData.defaultUrl)}}
                                    
                                  >
                                    
                                    <p style={{color:data.textColor}}>{data.title}</p>
                                  </div>))
                              }
                              </div>

                            </div>
                            <div>
                              <p className={Styles.subtitle}>Weekly STUDY</p>
                              <div>                              
                                <div className={Styles.childCard}>
                                {
                                  weeklyStudyData.data.map((data)=>(
                                  <div style={{backgroundColor: data.backgroundColor}} 
                                      className={Styles.dailyStudyCards} 
                                      key={data.title}
                                      onMouseOver={()=>{setselectedChumashScreen(data.imageUrl)}}
                                      onMouseLeave={()=>{setselectedChumashScreen(dailyStudyData.defaultUrl)}}
                                  >
                                    
                                    <p style={{color:data.textColor}}>{data.title}</p>
                                  
                                  </div>))
                                }
                                </div>

                            </div>
                            </div>
                       
                    </div>
                    
                    <div className={Styles.cardContentRight}>
                        <Image src={GOTMobileImage1} alt="Chayenu Mobile" height={411} width={190} objectFit="contain"/>
                        <Image className={Styles.screen} src={selectedChumashScreen} alt="Chayenu Mobile" height={396} width={175} objectFit="contain"/>
                    </div>

                    
                </div>


                <div className={Styles.card}> 

                  <p>“As a subscriber of Chayenu I am thrilled to finally have a weekly study guide. On the road traveling often and constantly on the go, Chayenu has provided me an easy way to learn. Written in English that is perfect for the beginner to the more advanced. I strongly recommend Chayenu to anyone looking for that one booklet to assist you with your personal growth in Torah Study”</p>

                  <p>Alan “Shlomo” Veingrad, former NFL offensive lineman with the Green Bay Packers & Dallas Cowboys Super Bowl XXVII championship team</p>

                </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section4}>
                                
                  <div className={Styles.card}>
                    <div className={Styles.column1}>
                        <h2>Gate of Trust</h2>
                        <p className={Styles.note}>An Ancient Yet Relevant Manual, For Navigating Life With Positivity, Poise, And Purpose.</p>
                        <p>In the Chayenu app or in book form</p>
                        <p>BUY THE BOOK</p>
                    </div>
                    
                    <div>
                                <Image src={GOTBookImage} alt="" width={295} height={429}/>
                    </div>
                    
                    <div>
                                <Image src={GOTMobileImage1} alt="" width={203} height={400}/>
                    </div>
                    
                    <div>
                                <Image src={GOTMobileImage2} alt="" width={203} height={400}/>
                    </div>
                  
                  </div>                

            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section5}>
              <div className={Styles.card}>
                    <div className={Styles.column1}>
                        <h2>Steinsaltz Talmud</h2>
                        <p>The Talmud At Your Fingertips</p>
                        <span>Chayenu App</span>
                        <Image src={SteinsaltzLogo} alt="" width={80} height={80}/>
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
                      <Image src={Chayus} alt="" width={450} height={359}/>
                      <p className={Styles.sample}>Sample | Browse Archive</p>
                      <button>SUBSCRIBE TO CHAYUS</button>

                </div>

                <div>
                      <h2>Chitas.org</h2>
                      <p>Join the movement to study Chitas daily, and in turn, receive and retain blessings from Hashem.</p>
                      <p className={Styles.sample}>COMING SOON</p>
                      <Image src={Chitas} alt="" width={300} height={390}/>
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
