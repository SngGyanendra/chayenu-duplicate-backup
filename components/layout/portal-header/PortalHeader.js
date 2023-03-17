import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWindowDimensions } from '/hooks';
import Styles from './PortalHeader.module.scss';

export function PortalHeader() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const pagesList = [
    {
      name: 'SUBSCRIPTIONS',
      imageUrl: '/header/autorenew.svg',
      url: 'my-subscriptions',
    },
    {
      name: 'PAYMENT',
      imageUrl: '/header/dollar.svg',
      url: 'payments',
    },
    {
      name: 'PROFILE',
      imageUrl: '/header/profile.svg',
      url: 'profile',
    },
    {
      name: 'TRANSACTIONS',
      imageUrl: '/header/receipt.svg',
      url: 'transactions',
    },
    {
      name: 'SUPPORT',
      imageUrl: '/header/support.svg',
      url: 'support',
    },
    {
      name: 'LOGOUT',
      imageUrl: '/header/logout.svg',
    },
  ];

  const checkCurrentRoute = () => {
    return router.pathname.split('/')[router.pathname.split('/').length - 1];
  };

  return (
    <header className={Styles.header}>
      <ul>
        {width > 1000 ? (
          pagesList.map((page, index) => (
            <Link key={index} href={`${page.url}`}>
              <li
                className={`${
                  page.url === checkCurrentRoute()
                    ? `${Styles.highlighted}`
                    : ''
                }`}
              >
                {page.imageUrl && (
                  <Image
                    src={page.imageUrl}
                    alt="subscribe"
                    height={20}
                    width={20}
                  />
                )}
                {page.name}
              </li>
            </Link>
          ))
        ) : (
          <li>
            {pagesList.filter((page) => page.url === checkCurrentRoute())[0].name}
          </li>
        )}
      </ul>
    </header>
  );
}
