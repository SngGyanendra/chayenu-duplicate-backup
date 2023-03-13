import Image from 'next/image';
import Link from 'next/link';
import Styles from './header.module.scss';
import { useRef } from 'react';

export function Header() {
  const handleMenu = () => {
    const element = document.getElementsByClassName('menu')[0];
    element.classList.toggle('menuClose');
  };
  const handleClickedOutside = (e) => {
    if (!menu.current.contains(e.target)) {
      handleMenu();
    }
  };
  const menu = useRef();

  return (
    <header className={Styles.header}>
      <div className={Styles.mobileHeader}>
        <div>
          <Image
            src="/hamburger.svg"
            alt="menu"
            height={30}
            width={30}
            loading="lazy"
            onClick={handleMenu}
          />
        </div>
        <div>
          <Image
            src="/logo.svg"
            alt="logo"
            height={50}
            width={80}
            loading="lazy"
          />
        </div>
      </div>
      <div
        className={`${Styles.translucentLayer} menuClose menu`}
        onClick={(e) => {
          handleClickedOutside(e);
        }}
      >
        <div className={Styles.headerContainer} ref={menu}>
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                height={50}
                width={80}
                loading="lazy"
              />
            </Link>
          </div>
          <div>
            <ul>
              <li>SUBSCRIBE</li>
              <li>EXPLORE</li>
            </ul>
          </div>
          <div>LOGIN</div>
        </div>
      </div>
    </header>
  );
}
