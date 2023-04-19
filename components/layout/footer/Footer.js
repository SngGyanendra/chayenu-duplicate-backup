import Styles from './footer.module.scss';
import Image from 'next/image';

export function Footer() {
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
          <li>Subscribe</li>
          <li>Explore</li>
          <li>Library</li>
          <li>Chayus</li>
          <li>Newsletter</li>
        </ul>
      </div>
      <div className={Styles.lowerLayer}>
        <ul>
          <li>info@chayenu.org</li>
          <li>(718) 450-3277</li>
          <li>1526 Union St. Brooklyn, NY 11213</li>
        </ul>
        <div>Copyright © 2022 CHAYENU. All rights reserved.</div>
      </div>
    </footer>
  );
}
