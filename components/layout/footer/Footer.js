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
  return (
    <>
    <footer className={Styles.footer}>
      <div className={Styles.inner}>
          <div className={Styles.item}>
            <h2>MAIN</h2>
            <Link href="/subscribe">Subscribe</Link>
            <Link href="/explore-chayenu">Explore</Link>
            <Link href="/comingsoon">Library</Link>
            <Link href="https://old.chayenu.org/weekly-digest/" target="_blank">
              Chayus
            </Link>
            <label onClick={() => {setPopup('newsletter');}}>Newsletter</label>
          </div>
          <div className={Styles.item}>
            <h2>SPECIALS</h2>
            <Link href="/comingsoon">Bulk Orders</Link>
            <Link href="/comingsoon">Shluchim</Link>
            <Link href="/comingsoon">Schools</Link>
            <Link href="/trial">Trial</Link>
            <Link href="/comingsoon">Military</Link>
          </div>
          <div className={Styles.item}>
            <h2>DEPARMENTS</h2>
            <Link href="/comingsoon">
              <Image
                src="/footer/gate-of-trust.svg"
                alt="gate-of-trust"
                height={20}
                width={20}
                className=''
              />
              <span>Gate of Trust</span> 
            </Link>
            <Link href="/comingsoon">
              <Image
                src="/footer/chitas.svg"
                alt="chitas"
                height={20}
                width={20}
                className=''
              />
              <span>Chitas</span> 
            </Link>
          </div>
          <div className={Styles.item}>
            <h2>COMMUNITY</h2>
            <Link href="#">
              <Image
                src="/footer/facebook.svg"
                alt="facebook"
                height={20}
                width={20}
                className=''
              />
              <span>Facebook</span> 
            </Link>
            <Link href="#">
              <Image
                src="/footer/vimeo.svg"
                alt="vimeo"
                height={20}
                width={20}
                className=''
              />
              <span>Vimeo</span>
            </Link>
            <Link href="#">
              <Image
                src="/footer/gate-of-trust.svg"
                alt="gate-of-trust"
                height={20}
                width={20}
                className=''
              />
              <span>Gate of Trust</span>
            </Link>
            <Link href="#">
              <Image
                src="/footer/whatsapp.svg"
                alt="whatsapp"
                height={20}
                width={20}
                className=''
              />
              <span>Whatsapp</span>
            </Link>
            <Link href="#">
              <Image
                src="/footer/insta.svg"
                alt="insta"
                height={20}
                width={20}
                className=''
              />
              <span>Instagram</span>
            </Link>
          </div>
          <div className={Styles.item}>
            <h2>ABOUT</h2>
            <Link href="/contact">Contact Us</Link>
            <a href='tel:(718) 450-3277'>(718) 450-3277</a>
            <a>
              1526 Union St. <br />
              Brooklyn, NY, 11213
            </a>
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
        <div className={Styles.inc}>© CHAYENU INC.</div>
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
