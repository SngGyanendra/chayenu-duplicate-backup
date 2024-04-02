import Link from 'next/link';
import Styles from './footer.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NewsLetter } from '/components/forms';
import { Popup } from '/components/common';
import { useState } from 'react';

export function Footer() {
  const [popup, setPopup] = useState('');
  const router = useRouter();
  const socialLinks=[
    {
      url:'https://www.facebook.com/Chayenu/',
      icon:'/footer/facebook.svg',
      label:'Facebook'
    },
    {
      url:'https://vimeo.com/chayenu',
      icon:'/footer/vimeo.svg',
      label:'Vimeo'
    },
    {
      url:'https://api.whatsapp.com/send/?phone=17184503277&text&type=phone_number&app_absent=0',
      icon:'/footer/whatsapp.svg',
      label:'Whatsapp'
    },
    {
      url:'https://www.instagram.com/chayenu/?hl=en',
      icon:'/footer/insta.svg',
      label:'Instagram'
    }
  ];
  return (
    <>
    <footer className={Styles.footer}>
      <div className={Styles.inner}>
          <div className={Styles.item}>
            <h2>main</h2>
            <Link href="/subscribe">Subscribe</Link>
            <Link href="/explore-chayenu">Explore</Link>
            <Link href="/comingsoon">Library</Link>
            <Link href="https://old.chayenu.org/weekly-digest/" target="_blank">
              Chayus
            </Link>
            <label onClick={() => {setPopup('newsletter');}}>Newsletter</label>
          </div>
          <div className={Styles.item}>
            <h2>specials</h2>
            <Link href="/specialorders" target='_blank'>Bulk Orders</Link>
            <Link href="/shluchim" target='_blank'>Shluchim</Link>
            <Link href="/schools" target='_blank'>Schools</Link>
            <Link href="/trial">Trial</Link>
            <Link href="/subscribe?is_shluchim_only=true">Military</Link>
          </div>
          <div className={Styles.item}>
            <h2>departments</h2>
            <Link href="http://gateoftrust.org/" target='_blank'>
              <Image
                src="/footer/gate-of-trust.svg"
                alt="gate-of-trust"
                height={20}
                width={20}
              />
              <span>Gate of Trust</span> 
            </Link>
            <Link href="/comingsoon">
              <Image
                src="/footer/chitas.svg"
                alt="chitas"
                height={20}
                width={20}
              />
              <span>Chitas</span> 
            </Link>
          </div>
          <div className={Styles.item}>
            <h2>community</h2>
            {
              socialLinks.map((link, index) => {
                return (
                  <Link key={index} href={link.url} target="_blank">
                  <Image
                    src={link.icon}
                    alt={link.label}
                    height={20}
                    width={20}
                  />
                  <span>{link.label}</span>
                  </Link>
                );
              })
            }
          </div>
          <div className={Styles.item}>
            <h2>about</h2>
            <Link href="/contact">Contact Us</Link>
            <a href='tel:7184503277'>(718) 450-3277</a>
            <address>
              1526 Union St. <br />
              Brooklyn, NY, 11213
            </address>
          </div>
      </div>
      {(() => {
        if (popup === 'newsletter') {
          return (
            <Popup setPopupState={setPopup}>
              <NewsLetter setPopupState={setPopup} />
            </Popup>
          );
        }
      })()}
    </footer>
    <div className={Styles.lowerFooter}>
      <div className={Styles.inner}>
        <div className={Styles.logo}>
          <Image
            src="/logo.svg"
            alt="logo"
            height={40}
            width={68}
            loading="lazy"
          />
        </div>
        <div className={Styles.inc}>© chayenu inc.</div>
        <div className={Styles.developedBy}>
          <Link href="https://gorinsystems.com" target="_blank">
            <span>Developed by{' '}</span>
            <Image
              src={'/footer/gorinsystems.svg'}
              alt="gorin systems"
              height={18}
              width={100}
            />{' '}
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}
