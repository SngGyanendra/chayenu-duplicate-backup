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
    <footer className={Styles.footer}>
      <div className={Styles.upperLayer}>
        <div className={Styles.logo}>
          <Image
            src="/logo.svg"
            alt="logo"
            height={40}
            width={68}
            loading="lazy"
          />
        </div>
        <ul>
          <li>
            <Link href="/subscribe">SUBSCRIBE</Link>
          </li>
          <li>
            <Link href="/explore-chayenu">EXPLORE</Link>
          </li>
          <li>
            <Link href="/comingsoon">LIBRARY</Link>
          </li>
          <li>
            <Link href="https://old.chayenu.org/weekly-digest/" target="_blank">
              CHAYUS
            </Link>
          </li>
          <li
            onClick={() => {
              setPopup('newsletter');
            }}
          >
            NEWSLETTER
          </li>

          <li className={Styles.instaMobile}>
            <Link
              href="https://www.instagram.com/chayenu/?hl=en"
              target="_blank"
            >
              <Image
                src="/footer/insta.svg"
                alt="insta"
                height={20}
                width={20}
                className={Styles.instaLogo}
              />
            </Link>
          </li>
        </ul>
        <div className={Styles.instaDesktop}>
          <Link href="https://www.instagram.com/chayenu/?hl=en" target="_blank">
            <Image
              src="/footer/insta.svg"
              alt="insta"
              height={20}
              width={20}
              className={Styles.instaLogo}
            />
          </Link>
        </div>
      </div>
      <div className={Styles.lowerLayer}>
        <div>© CHAYENU INC.</div>
        <ul>
          <li>
            <Link href="/contact">Contact us</Link>
          </li>
          <li>info@chayenu.org</li>
          <li>(718) 450-3277</li>
          <li>1526 Union St. Brooklyn, NY 11213</li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
        </ul>
        <div className={Styles.developedBy}>
          <Link href="https://gorinsystems.com" target="_blank">
            Developed by{' '}
            <Image
              src={'/footer/gorinsystems.svg'}
              alt="gorin systems"
              height={18}
              width={100}
            />{' '}
          </Link>
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
  );
}
