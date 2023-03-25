import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '/store/authSlice';
import Styles from './header.module.scss';
import { useRef, useState } from 'react';
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

  const menu = useRef();
  const loggedInDropDown = useRef();

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
                isDropDownOpen ? `${Styles.backgroundLight}` : ''
              }`}
            >
              {isLoggedIn ? (
                <div className={Styles.login}>
                  <div
                    onClick={() =>
                      setIsDropDownOpen((previousState) => !previousState)
                    }
                  >
                    {!isDropDownOpen ? (
                      <Image
                        src="/profilecircular.svg"
                        alt=""
                        height={16}
                        width={16}
                      />
                    ) : (
                      <Image
                        src="/profilecirculardark.svg"
                        alt=""
                        height={16}
                        width={16}
                      />
                    )}
                    <span
                      className={isDropDownOpen ? `${Styles.colorDark}` : ''}
                    >
                      {user_details?.first_name}
                    </span>
                  </div>
                  {isDropDownOpen && (
                    <ul ref={loggedInDropDown}>
                      <li onClick={() => setIsDropDownOpen(false)}>
                        <Link href="/portal/my-subscriptions">
                          <Image
                            src="/header/autorenewdark.svg"
                            alt="subscribe"
                            height={15}
                            width={15}
                          />
                          My Subscriptions
                        </Link>
                      </li>
                      <li onClick={() => setIsDropDownOpen(false)}>
                        <Link href="/portal/payments">
                          <Image
                            src="/header/dollardark.svg"
                            alt="subscribe"
                            height={15}
                            width={15}
                          />
                          Payment Methods
                        </Link>
                      </li>
                      <li onClick={() => setIsDropDownOpen(false)}>
                        <Link href="/portal/profile">
                          <Image
                            src="/header/profiledark.svg"
                            alt="subscribe"
                            height={15}
                            width={15}
                          />
                          My Profile
                        </Link>
                      </li>
                      <li onClick={() => setIsDropDownOpen(false)}>
                        <Link href="/portal/transactions">
                          <Image
                            src="/header/receiptdark.svg"
                            alt="subscribe"
                            height={15}
                            width={15}
                          />
                          My Transactions
                        </Link>
                      </li>
                      <li onClick={() => setIsDropDownOpen(false)}>
                        <Link href="/portal/support">
                          <Image
                            src="/header/supportdark.svg"
                            alt="subscribe"
                            height={15}
                            width={15}
                          />
                          Support
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          setIsDropDownOpen(false);
                          dispatch(logoutUser());
                          router.push('/login');
                        }}
                      >
                        <Image
                          src="/header/logoutdark.svg"
                          alt="subscribe"
                          height={15}
                          width={15}
                        />
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <div className={`${Styles.loggedOut} ${Styles.portalLink}`}>
                  <Link href="/login">
                    <Image
                      src="/profilecircular.svg"
                      alt=""
                      height={16}
                      width={16}
                      onMouseEnter={(e) => {
                        e.target.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profilecirculardark.svg`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.src = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profilecircular.svg`;
                      }}
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
