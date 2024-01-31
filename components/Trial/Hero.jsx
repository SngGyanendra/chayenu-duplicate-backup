import Styles from "./Hero.module.scss";
import { useWindowDimensions } from '../../hooks/useWindow';
import {useState,useEffect} from 'react';
import Link from 'next/link';

export default function Hero() {
  const { width } = useWindowDimensions();
  const [tabView, setTabView] = useState(false);
  useEffect(()=>{
    
    if(width > 800 && width <= 1025 ){
      setTabView(true)
    }else{
        setTabView(false);
        console.log('else', width);
    }

  }, [width])

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main}>
        <div className={Styles.cardContentLeft}>
          <h1 className={`${Styles.title} ${tabView ? Styles.tabTitle:''}`}>Your Daily Study—Simplified</h1>
          <img className={Styles.mobileImg} src="/images/trial/trialhero2.webp" alt="hero" />
          <p className={Styles.subtitle}>Sign up for a <strong>FREE 30-day</strong><strong className={Styles.strong}> trial</strong>, and join the <strong className={Styles.strong}>30,000+</strong> busy individuals worldwide who’ve made Chayenu their <strong className={Styles.strong}>daily Torah study companion.</strong></p>
          <div className={Styles.header}>
            <Link href="/trial-form" className={Styles.cta}>
                YES. I WANT MY <strong>FREE</strong> 30-DAY ACCESS NOW!
            </Link>
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
            </div>
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
