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
            <Link href="/subscribe">Subscribe</Link>
          </li>
          <li>
            <Link href="/explore-chayenu">Explore</Link>
          </li>
          <li>
            <Link href="/comingsoon">Library</Link>
          </li>
          <li>
            <Link href="https://old.chayenu.org/weekly-digest/" target="_blank">
              Chayus
            </Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li
            onClick={() => {
              setPopup('newsletter');
            }}
          >
            Newsletter
          </li>
        </ul>
      </div>
      <div className={Styles.lowerLayer}>
        <div>
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
        <ul>
          <li>info@chayenu.org</li>
          <li>(718) 450-3277</li>
          <li>1526 Union St. Brooklyn, NY 11213</li>
        </ul>
        <div>Copyright © 2022 CHAYENU. </div>

        <div className={Styles.developedBy}>
          <Link href="https://gorinsystems.com/" target="_blank">
            Developed By{' '}
            <Image
              src="/footer/gorinsystems.svg"
              alt="gorinsystems"
              height={14}
              width={90}
            />
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
