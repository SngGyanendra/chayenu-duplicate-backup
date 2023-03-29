import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '/store/authSlice';
import Styles from './header.module.scss';
import { useRef, useState, useEffect } from 'react';
import { PortalHeader } from '../portal-header/PortalHeader';

export function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user_details } = useSelector((state) => state.user);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleMenu = () => {
    const element = document.getElementsByClassName('menu')[0];
    element.classList.toggle('menuClose');
    if (element.classList.contains('menuClose')) {
      document.body.style.overflowY = 'visible';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  };
  const handleClickedOutside = (e) => {
    if (!menu.current.contains(e.target)) {
      handleMenu();
    }
  };

  const dropDownOptions = [
    {
      label: 'Subscriptions',
      link: '/portal/my-subscriptions',
      alt: 'subscription',
      img: '/header/autorenewdark.svg',
      img_mb: '/header/autorenewdark_mb.svg',
    },
    {
      label: 'Payment Methods',
      link: '/portal/payments',
      alt: 'payment',
      img: '/header/dollardark.svg',
      img_mb: '/header/dollardark_mb.svg',
    },
    {
      label: 'Profile',
      link: '/portal/profile',
      alt: 'profile',

      img: '/header/profiledark.svg',
      img_mb: '/header/dollardark_mb.svg',
    },
    {
      label: 'My Transactions',
      link: '/portal/transactions',
      alt: 'transaction',

      img: '/header/receiptdark.svg',
      img_mb: '/header/receiptdark_mb.svg',
    },
    {
      label: 'Support',
      link: '/portal/support',
      alt: 'support',
      img: '/header/supportdark.svg',
      img_mb: '/header/dollardark_mb.svg',
    },
    {
      label: 'Logout',
      alt: 'logout',
      link: '/login',
      img: '/header/logoutdark.svg',
      img_mb: '/header/logout_mb.svg',
    },
  ];
  const [mobileScreen, setMobileScreen] = useState(false);
  useEffect(() => {
    window.matchMedia('(max-width: 1000px)').addEventListener('change', (e) => {
      setMobileScreen(e.matches);
    });
  }, []);
  useEffect(() => {
    if (typeof window != undefined) {
      setMobileScreen(window.matchMedia('(max-width: 1000px)').matches);
    }
  }, []);

  const menu = useRef();
  const chayenuLogo = useRef();

  return (
    <>
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
                  onMouseEnter={(e) => {
                    e.target.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/logodarker.svg`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/logo.svg`;
                  }}
                />
              </Link>
            </div>
            <div>
              <ul>
                <li className={Styles.portalLink}>
                  <Link href="/subscribe">SUBSCRIBE</Link>
                </li>
                <li className={Styles.portalLink}>
                  <Link href="/explore">EXPLORE</Link>
                </li>
              </ul>
            </div>
            <div
              className={`${Styles.userDetails} ${
                isDropDownOpen && !mobileScreen
                  ? `${Styles.backgroundLight}`
                  : ''
              }`}
            >
              {isLoggedIn ? (
                <div className={Styles.login}>
                  <div
                    onClick={() =>
                      setIsDropDownOpen((previousState) => !previousState)
                    }
                  >
                    <Image
                      src={
                        isDropDownOpen && !mobileScreen
                          ? '/profilecirculardark.svg'
                          : '/profilecircular.svg'
                      }
                      alt=""
                      height={16}
                      width={16}
                    />

                    <span
                      className={
                        isDropDownOpen && !mobileScreen
                          ? `${Styles.colorDark}`
                          : ''
                      }
                    >
                      {user_details?.first_name}
                    </span>
                  </div>
                  {(isDropDownOpen || mobileScreen) && (
                    <ul>
                      {dropDownOptions.map((e, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setIsDropDownOpen(false);
                            if (e.label === 'Logout') {
                              dispatch(logoutUser());
                              router.push(e.link);
                            }
                          }}
                        >
                          <Link
                            href={e.link}
                            aria-disabled={e.label === 'Logout' ? true : false}
                            onClick={handleMenu}
                          >
                            <Image
                              src={mobileScreen ? e?.img_mb : e?.img}
                              alt={e?.alt || ''}
                              height={16}
                              width={16}
                            />
                            {e?.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className={`${Styles.loggedOut} ${Styles.portalLink}`}>
                  <Link
                    href="/login"
                    onMouseEnter={() => {
                      chayenuLogo.current.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profilecirculardark.svg`;
                    }}
                    onMouseLeave={() => {
                      chayenuLogo.current.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profilecircular.svg`;
                    }}
                  >
                    <Image
                      src="/profilecircular.svg"
                      alt=""
                      height={16}
                      width={16}
                      ref={chayenuLogo}
                    />
                    LOGIN
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {router.pathname.split('/')[1] === 'portal' && <PortalHeader />}
    </>
  );
}
